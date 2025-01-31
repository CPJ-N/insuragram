import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface PremiumCalculatorProps {
  type: "health" | "life" | "car" | "travel"
}

export function PremiumCalculator({ type }: PremiumCalculatorProps) {
  const [formData, setFormData] = useState({
    age: "",
    coverage: 500000,
    term: "1",
    lifestyle: "moderate",
  })

  const [premium, setPremium] = useState<number | null>(null)

  const calculatePremium = () => {
    // This is a simplified premium calculation
    // In a real application, this would be more complex and based on actuarial tables
    let basePremium = parseInt(formData.coverage.toString()) * 0.001
    
    // Age factor
    const age = parseInt(formData.age)
    if (age > 50) {
      basePremium *= 1.5
    } else if (age > 35) {
      basePremium *= 1.2
    }

    // Lifestyle factor
    const lifestyleFactors = {
      sedentary: 1.2,
      moderate: 1.0,
      active: 0.8,
    }
    basePremium *= lifestyleFactors[formData.lifestyle as keyof typeof lifestyleFactors]

    // Term factor
    basePremium *= parseInt(formData.term)

    setPremium(Math.round(basePremium))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Calculator</CardTitle>
        <CardDescription>
          Calculate your estimated {type} insurance premium based on your requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Coverage Amount: ${formData.coverage.toLocaleString()}</Label>
          <Slider
            value={[formData.coverage]}
            min={100000}
            max={10000000}
            step={100000}
            onValueChange={(value) => setFormData({ ...formData, coverage: value[0] })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Policy Term (Years)</Label>
          <Select
            value={formData.term}
            onValueChange={(value) => setFormData({ ...formData, term: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="5">5 Years</SelectItem>
              <SelectItem value="10">10 Years</SelectItem>
              <SelectItem value="20">20 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lifestyle">Lifestyle</Label>
          <Select
            value={formData.lifestyle}
            onValueChange={(value) => setFormData({ ...formData, lifestyle: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select lifestyle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculatePremium} className="w-full">
          Calculate Premium
        </Button>

        {premium !== null && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Estimated Premium</h3>
            <div className="text-2xl font-bold">${premium.toLocaleString()}/year</div>
            <p className="text-sm text-muted-foreground mt-2">
              This is an estimated premium based on the information provided. 
              Actual premium may vary based on additional factors and underwriting.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 