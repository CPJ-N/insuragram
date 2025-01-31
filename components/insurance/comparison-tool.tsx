import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InsurancePlan {
  id: string
  name: string
  provider: string
  premium: number
  coverage: number
  features: string[]
  rating: number
}

interface ComparisonToolProps {
  type: "health" | "life" | "car" | "travel"
  plans: InsurancePlan[]
}

export function ComparisonTool({ type, plans }: ComparisonToolProps) {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [filters, setFilters] = useState({
    maxPremium: "",
    minCoverage: "",
  })

  const filteredPlans = plans.filter((plan) => {
    if (filters.maxPremium && plan.premium > parseInt(filters.maxPremium)) {
      return false
    }
    if (filters.minCoverage && plan.coverage < parseInt(filters.minCoverage)) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compare {type.charAt(0).toUpperCase() + type.slice(1)} Insurance Plans</CardTitle>
          <CardDescription>Select and compare different insurance plans to find the best fit for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="maxPremium">Maximum Premium</Label>
              <Input
                id="maxPremium"
                type="number"
                placeholder="Enter amount"
                value={filters.maxPremium}
                onChange={(e) => setFilters({ ...filters, maxPremium: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minCoverage">Minimum Coverage</Label>
              <Input
                id="minCoverage"
                type="number"
                placeholder="Enter amount"
                value={filters.minCoverage}
                onChange={(e) => setFilters({ ...filters, minCoverage: e.target.value })}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Compare</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedPlans.includes(plan.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlans([...selectedPlans, plan.id])
                        } else {
                          setSelectedPlans(selectedPlans.filter((id) => id !== plan.id))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.provider}</TableCell>
                  <TableCell>${plan.premium}/month</TableCell>
                  <TableCell>${plan.coverage.toLocaleString()}</TableCell>
                  <TableCell>{plan.rating}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selectedPlans.length > 0 && (
            <div className="mt-6">
              <Button>Compare Selected Plans</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedPlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  {selectedPlans.map((planId) => (
                    <TableHead key={planId}>
                      {plans.find((p) => p.id === planId)?.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Premium</TableCell>
                  {selectedPlans.map((planId) => (
                    <TableCell key={planId}>
                      ${plans.find((p) => p.id === planId)?.premium}/month
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Coverage</TableCell>
                  {selectedPlans.map((planId) => (
                    <TableCell key={planId}>
                      ${plans.find((p) => p.id === planId)?.coverage.toLocaleString()}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell>Features</TableCell>
                  {selectedPlans.map((planId) => (
                    <TableCell key={planId}>
                      <ul className="list-disc list-inside">
                        {plans.find((p) => p.id === planId)?.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 