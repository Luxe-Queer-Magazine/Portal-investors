"use client";

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { DollarSign, FileText, BarChart, PieChart, Bell, Download, Calendar } from 'lucide-react'

export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your investment portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Call
          </Button>
          <Button variant="luxury" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investment
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500,000</div>
            <p className="text-xs text-muted-foreground">
              Initial investment amount
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Value
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$547,500</div>
            <p className="text-xs text-green-500">
              +$47,500 (+9.5%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Distributions
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500</div>
            <p className="text-xs text-muted-foreground">
              Last distribution: May 1, 2025
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-yellow-500">
              1 pending signature
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm font-medium">Investment Type</div>
                    <div className="text-sm font-medium">Allocation</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-luxury-gold rounded-full"></div>
                      <div>
                        <div className="font-medium">Series A</div>
                        <div className="text-sm text-muted-foreground">$200,000</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">40%</div>
                      <div className="flex items-center text-sm text-green-500">
                        <BarChart className="h-3 w-3 mr-1" />
                        +8.5%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-12 bg-luxury-gold rounded-full"></div>
                      <div>
                        <div className="font-medium">Series B</div>
                        <div className="text-sm text-muted-foreground">$175,000</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">35%</div>
                      <div className="flex items-center text-sm text-green-500">
                        <BarChart className="h-3 w-3 mr-1" />
                        +12.2%
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Total Portfolio</div>
                      <div className="font-medium">$500,000</div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-sm text-muted-foreground">Current Value</div>
                      <div className="text-sm text-green-500">$547,500 (+9.5%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Quarterly distribution received</p>
                        <span className="text-sm font-medium text-luxury-primary">$12,500</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>May 1, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">New tax document available</p>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>April 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Portfolio allocation details will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Performance metrics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-sm text-muted-foreground">Document list will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-sm text-muted-foreground">Activity feed will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
