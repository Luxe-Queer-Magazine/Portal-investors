import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sparkles, TrendingUp, DollarSign, Users, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const data = [
  {
    title: "Total Investments",
    value: "$4.8M",
    description: "Total investment value",
    icon: DollarSign,
    change: "+12%",
    changeType: "increase"
  },
  {
    title: "Active Investors",
    value: "40k",
    description: "Total active investors",
    icon: Users,
    change: "+8%",
    changeType: "increase"
  },
  {
    title: "Due Diligence",
    value: "95%",
    description: "Completed due diligence",
    icon: Sparkles,
    change: "+3%",
    changeType: "increase"
  },
  {
    title: "CRM Contacts",
    value: "10k",
    description: "Total CRM contacts",
    icon: Users,
    change: "+5%",
    changeType: "increase"
  }
]

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <Card key={item.title} className="luxury-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">{item.title}</div>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gold">
              <item.icon className="h-2 w-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.description}
            </p>
            <div className="mt-4 flex items-center">
              <p
                className={`text-xs ${
                  item.changeType === "increase"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.change}
              </p>
              <Progress
                value={parseInt(item.value.replace(/[^0-9]/g, ""))}
                className="ml-2 h-1 w-24"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
