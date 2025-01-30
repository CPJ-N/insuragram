import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Heart, Home } from "lucide-react"

const policies = [
  {
    id: 1,
    type: "Health Insurance",
    policyNumber: "HI-2024-001",
    status: "Active",
    premium: "$150/month",
    coverage: "$500,000",
    renewalDate: "Jan 15, 2025",
    icon: Heart,
  },
  {
    id: 2,
    type: "Car Insurance",
    policyNumber: "CI-2024-002",
    status: "Active",
    premium: "$80/month",
    coverage: "$25,000",
    renewalDate: "Mar 20, 2025",
    icon: Car,
  },
  {
    id: 3,
    type: "Home Insurance",
    policyNumber: "HO-2024-003",
    status: "Active",
    premium: "$120/month",
    coverage: "$300,000",
    renewalDate: "Apr 10, 2025",
    icon: Home,
  },
]

export default function PoliciesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Policies</h1>
        <Button>Add New Policy</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => {
          const Icon = policy.icon
          return (
            <Card key={policy.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {policy.type}
                  </div>
                </CardTitle>
                <Badge variant="secondary">{policy.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Policy Number</p>
                    <p className="font-medium">{policy.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Premium</p>
                    <p className="font-medium">{policy.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="font-medium">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Renewal Date</p>
                    <p className="font-medium">{policy.renewalDate}</p>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 