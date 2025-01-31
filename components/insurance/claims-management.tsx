"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileUploader } from "@/components/ui/file-uploader"

interface Claim {
  id: string
  policyNumber: string
  type: string
  amount: number
  status: "pending" | "approved" | "rejected"
  date: string
  description: string
}

export function ClaimsManagement() {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "1",
      policyNumber: "POL-123456",
      type: "Health",
      amount: 5000,
      status: "pending",
      date: "2024-02-15",
      description: "Hospital admission for surgery",
    },
    // Add more sample claims as needed
  ])

  const [newClaim, setNewClaim] = useState({
    policyNumber: "",
    type: "",
    amount: "",
    description: "",
  })

  const handleSubmitClaim = () => {
    const claim: Claim = {
      id: Math.random().toString(36).substr(2, 9),
      policyNumber: newClaim.policyNumber,
      type: newClaim.type,
      amount: parseFloat(newClaim.amount),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      description: newClaim.description,
    }

    setClaims([claim, ...claims])
    setNewClaim({
      policyNumber: "",
      type: "",
      amount: "",
      description: "",
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>File a New Claim</CardTitle>
          <CardDescription>Submit a new insurance claim for processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                value={newClaim.policyNumber}
                onChange={(e) => setNewClaim({ ...newClaim, policyNumber: e.target.value })}
                placeholder="Enter policy number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Claim Type</Label>
              <Select
                value={newClaim.type}
                onValueChange={(value) => setNewClaim({ ...newClaim, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select claim type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Life">Life</SelectItem>
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Claim Amount</Label>
            <Input
              id="amount"
              type="number"
              value={newClaim.amount}
              onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
              placeholder="Enter claim amount"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newClaim.description}
              onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
              placeholder="Describe your claim"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Supporting Documents</Label>
            <FileUploader 
              onUpload={(files) => console.log("Files uploaded:", files)}
              acceptedFileTypes={[".pdf", ".jpg", ".png"]}
              maxFileSize={5}
            />
          </div>

          <Button onClick={handleSubmitClaim} className="w-full">
            Submit Claim
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claims History</CardTitle>
          <CardDescription>View and track your insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>{claim.policyNumber}</TableCell>
                  <TableCell>{claim.type}</TableCell>
                  <TableCell>${claim.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        claim.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{claim.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 