"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Download, AlertCircle } from "lucide-react"

interface Policy {
  id: string
  type: string
  policyNumber: string
  startDate: string
  endDate: string
  premium: number
  coverage: number
  status: "active" | "expired" | "pending"
  documents: string[]
}

export function PolicyManagement() {
  const [policies] = useState<Policy[]>([
    {
      id: "1",
      type: "Health Insurance",
      policyNumber: "POL-123456",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      premium: 250,
      coverage: 500000,
      status: "active",
      documents: ["Policy Document", "Terms and Conditions", "Coverage Details"],
    },
    // Add more sample policies as needed
  ])

  const getStatusColor = (status: Policy["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Insurance Policies</CardTitle>
          <CardDescription>View and manage your active insurance policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Type</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Coverage Period</TableHead>
                <TableHead>Premium</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell>{policy.type}</TableCell>
                  <TableCell>{policy.policyNumber}</TableCell>
                  <TableCell>
                    {policy.startDate} to {policy.endDate}
                  </TableCell>
                  <TableCell>${policy.premium}/month</TableCell>
                  <TableCell>${policy.coverage.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(policy.status)}
                    >
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Policy Details</DialogTitle>
                            <DialogDescription>
                              Complete information about your policy
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Policy Information</h4>
                              <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="text-gray-500">Policy Number:</dt>
                                <dd>{policy.policyNumber}</dd>
                                <dt className="text-gray-500">Type:</dt>
                                <dd>{policy.type}</dd>
                                <dt className="text-gray-500">Start Date:</dt>
                                <dd>{policy.startDate}</dd>
                                <dt className="text-gray-500">End Date:</dt>
                                <dd>{policy.endDate}</dd>
                                <dt className="text-gray-500">Premium:</dt>
                                <dd>${policy.premium}/month</dd>
                                <dt className="text-gray-500">Coverage:</dt>
                                <dd>${policy.coverage.toLocaleString()}</dd>
                              </dl>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Documents</h4>
                              <ul className="space-y-2">
                                {policy.documents.map((doc, index) => (
                                  <li key={index} className="flex items-center justify-between text-sm">
                                    <span>{doc}</span>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {policy.status === "active" && (
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          File Claim
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy Renewal Reminders</CardTitle>
          <CardDescription>Stay updated about your policy renewals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies
              .filter((policy) => {
                const endDate = new Date(policy.endDate)
                const today = new Date()
                const daysUntilExpiry = Math.ceil(
                  (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                )
                return daysUntilExpiry <= 30 && daysUntilExpiry > 0
              })
              .map((policy) => {
                const endDate = new Date(policy.endDate)
                const today = new Date()
                const daysUntilExpiry = Math.ceil(
                  (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                )
                return (
                  <div
                    key={policy.id}
                    className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{policy.type}</p>
                      <p className="text-sm text-gray-600">
                        Policy {policy.policyNumber} expires in {daysUntilExpiry} days
                      </p>
                    </div>
                    <Button>Renew Now</Button>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 