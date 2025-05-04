-- Create custom types
CREATE TYPE user_role AS ENUM ('investor', 'admin', 'member');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'pending', 'cancelled');
CREATE TYPE document_type AS ENUM ('pitch_deck', 'financial', 'legal', 'marketing');
CREATE TYPE document_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE access_level AS ENUM ('public', 'investor', 'admin');
CREATE TYPE campaign_type AS ENUM ('email', 'event', 'direct');
CREATE TYPE campaign_status AS ENUM ('draft', 'scheduled', 'active', 'completed');
CREATE TYPE contact_status AS ENUM ('lead', 'prospect', 'investor', 'declined');
CREATE TYPE interest_level AS ENUM ('high', 'medium', 'low');

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'member',
    subscription_tier TEXT,
    subscription_status subscription_status DEFAULT 'inactive',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    tier_id TEXT NOT NULL,
    status subscription_status DEFAULT 'pending',
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contacts table (CRM)
CREATE TABLE public.contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    position TEXT,
    investment_range TEXT,
    interest_level interest_level DEFAULT 'medium',
    status contact_status DEFAULT 'lead',
    notes TEXT,
    last_contacted TIMESTAMPTZ,
    assigned_to UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create documents table
CREATE TABLE public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    type document_type NOT NULL,
    version TEXT NOT NULL,
    status document_status DEFAULT 'draft',
    access_level access_level DEFAULT 'admin',
    file_url TEXT NOT NULL,
    created_by UUID REFERENCES public.profiles(id) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create document access tracking
CREATE TABLE public.document_access (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    document_id UUID REFERENCES public.documents(id) NOT NULL,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    access_type TEXT NOT NULL CHECK (access_type IN ('view', 'edit')),
    last_accessed TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(document_id, user_id)
);

-- Create marketing campaigns table
CREATE TABLE public.marketing_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type campaign_type NOT NULL,
    status campaign_status DEFAULT 'draft',
    target_audience TEXT[] NOT NULL,
    content JSONB NOT NULL,
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create campaign analytics table
CREATE TABLE public.campaign_analytics (
    campaign_id UUID REFERENCES public.marketing_campaigns(id) PRIMARY KEY,
    total_sent INTEGER DEFAULT 0,
    opened INTEGER DEFAULT 0,
    clicked INTEGER DEFAULT 0,
    converted INTEGER DEFAULT 0,
    unsubscribed INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_status ON public.contacts(status);
CREATE INDEX idx_documents_type ON public.documents(type);
CREATE INDEX idx_documents_access ON public.documents(access_level);
CREATE INDEX idx_campaigns_status ON public.marketing_campaigns(status);

-- Set up Row Level Security policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
    ON public.profiles FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can read own subscription"
    ON public.subscriptions FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Admins can read all subscriptions"
    ON public.subscriptions FOR SELECT
    USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage subscriptions"
    ON public.subscriptions FOR ALL
    USING (is_admin(auth.uid()));

-- Contacts policies
CREATE POLICY "Admins can manage contacts"
    ON public.contacts FOR ALL
    USING (is_admin(auth.uid()));

CREATE POLICY "Users can view assigned contacts"
    ON public.contacts FOR SELECT
    USING (assigned_to = auth.uid());

-- Documents policies
CREATE POLICY "Users can read public documents"
    ON public.documents FOR SELECT
    USING (access_level = 'public');

CREATE POLICY "Investors can read investor documents"
    ON public.documents FOR SELECT
    USING (
        access_level = 'investor' AND EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'investor'
        )
    );

CREATE POLICY "Admins can manage documents"
    ON public.documents FOR ALL
    USING (is_admin(auth.uid()));

-- Document access policies
CREATE POLICY "Users can view their document access"
    ON public.document_access FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage document access"
    ON public.document_access FOR ALL
    USING (is_admin(auth.uid()));

-- Marketing campaigns policies
CREATE POLICY "Admins can manage campaigns"
    ON public.marketing_campaigns FOR ALL
    USING (is_admin(auth.uid()));

CREATE POLICY "Users can view campaigns"
    ON public.marketing_campaigns FOR SELECT
    USING (status = 'active');

-- Campaign analytics policies
CREATE POLICY "Admins can manage analytics"
    ON public.campaign_analytics FOR ALL
    USING (is_admin(auth.uid()));

-- Create function to handle updates
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER set_timestamp_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_subscriptions
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_contacts
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_documents
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_campaigns
    BEFORE UPDATE ON public.marketing_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();