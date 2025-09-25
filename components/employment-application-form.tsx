"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  User,
  Briefcase,
  GraduationCap,
  Building,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertCircle,
} from "lucide-react"

interface FormData {
  // Personal Information
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  maritalStatus: string
  currentAddress: string
  permanentAddress: string
  phoneNumber: string
  email: string
  identificationNumber: string

  // Position Applied For
  jobTitle: string
  expectedSalary: string
  availability: string
  preferredLocation: string

  // Education Background
  highestQualification: string
  institution: string
  fieldOfStudy: string
  graduationYear: string
  certifications: string

  // Work Experience
  companyName: string
  position: string
  duration: string
  responsibilities: string
  reasonForLeaving: string
}

const initialFormData: FormData = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  maritalStatus: "",
  currentAddress: "",
  permanentAddress: "",
  phoneNumber: "",
  email: "",
  identificationNumber: "",
  jobTitle: "",
  expectedSalary: "",
  availability: "",
  preferredLocation: "",
  highestQualification: "",
  institution: "",
  fieldOfStudy: "",
  graduationYear: "",
  certifications: "",
  companyName: "",
  position: "",
  duration: "",
  responsibilities: "",
  reasonForLeaving: "",
}

export function EmploymentApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const validateCurrentStep = (): boolean => {
    const errors: string[] = []

    if (currentStep === 1) {
      // Personal Information validation
      if (!formData.fullName.trim()) errors.push("Full Name is required")
      if (!formData.dateOfBirth.trim()) errors.push("Date of Birth is required")
      if (!formData.gender.trim()) errors.push("Gender is required")
      if (!formData.nationality.trim()) errors.push("Nationality is required")
      if (!formData.currentAddress.trim()) errors.push("Current Address is required")
      if (!formData.phoneNumber.trim()) errors.push("Phone Number is required")
      if (!formData.email.trim()) errors.push("Email Address is required")
      if (!formData.identificationNumber.trim()) errors.push("Identification Number is required")

      // Email format validation
      if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push("Please enter a valid email address")
      }
    }

    if (currentStep === 2) {
      // Position validation
      if (!formData.jobTitle.trim()) errors.push("Job Title is required")
      if (!formData.availability.trim()) errors.push("Availability is required")
    }

    if (currentStep === 3) {
      // Education validation
      if (!formData.highestQualification.trim()) errors.push("Highest Qualification is required")
      if (!formData.institution.trim()) errors.push("Institution is required")
      if (!formData.fieldOfStudy.trim()) errors.push("Field of Study is required")
      if (!formData.graduationYear.trim()) errors.push("Graduation Year is required")
    }

    if (currentStep === 4) {
      // Work Experience validation
      if (!formData.companyName.trim()) errors.push("Company Name is required")
      if (!formData.position.trim()) errors.push("Position is required")
      if (!formData.duration.trim()) errors.push("Duration is required")
      if (!formData.responsibilities.trim()) errors.push("Responsibilities are required")
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationErrors([])
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    try {
      const response = await fetch("http://localhost:5000/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit application")
      }

      setIsSubmitted(true)
    } catch (error) {
      alert("Error submitting application: " + (error as Error).message)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setCurrentStep(1)
    setFormData(initialFormData)
    setValidationErrors([])
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-900">Application Submitted Successfully!</h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                Thank you for your interest in joining our team. We have received your application and will review it
                carefully. You can expect to hear from us within 5-7 business days.
              </p>
            </div>
            <Button size="lg" className="mt-6" onClick={resetForm}>
              Submit Another Application
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const stepIcons = [User, Briefcase, GraduationCap, Building]
  const stepTitles = ["Personal Information", "Position Applied For", "Education Background", "Work Experience"]

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <Card className="overflow-hidden">
        <CardHeader className="p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardDescription>
                Step {currentStep} of {totalSteps}
              </CardDescription>
              <CardTitle className="text-xl">{stepTitles[currentStep - 1]}</CardTitle>
            </div>
            <div className="text-right space-y-1">
              <span className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</span>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={progress} className="h-3 mt-4" />
        </CardHeader>
        <CardContent className="pt-0 p-6">
          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            {stepTitles.map((title, index) => {
              const StepIcon = stepIcons[index]
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep

              return (
                <div key={title} className="flex flex-col items-center space-y-3">
                  <div
                    className={`
                      flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200
                      ${
                        isActive
                          ? "border-blue-600 bg-blue-600 text-white shadow-lg scale-110"
                          : isCompleted
                            ? "border-green-500 bg-green-500 text-white shadow-md"
                            : "border-border bg-card text-muted-foreground"
                      }
                    `}
                  >
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-xs text-center max-w-20 leading-tight ${
                      isActive ? "text-blue-600 font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {title}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            {React.createElement(stepIcons[currentStep - 1], { className: "h-6 w-6 text-blue-600" })}
            {stepTitles[currentStep - 1]}
          </CardTitle>
          <CardDescription className="text-base leading-relaxed pt-2">
            {currentStep === 1 && "Please provide your personal details and contact information accurately."}
            {currentStep === 2 && "Tell us about the position you're interested in and your preferences."}
            {currentStep === 3 && "Share your educational background and professional qualifications."}
            {currentStep === 4 && "Provide details about your most recent work experience and achievements."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Please complete the following required fields:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="fullName" className="text-sm font-semibold">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="dateOfBirth" className="text-sm font-semibold">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) => updateFormData("gender", value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="nationality" className="text-sm font-semibold">
                    Nationality *
                  </Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => updateFormData("nationality", e.target.value)}
                    placeholder="Enter your nationality"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="maritalStatus" className="text-sm font-semibold">
                  Marital Status
                </Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => updateFormData("maritalStatus", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-4">
                  Address Information
                </h3>
                <div className="space-y-3">
                  <Label htmlFor="currentAddress" className="text-sm font-semibold">
                    Current Address *
                  </Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => updateFormData("currentAddress", e.target.value)}
                    placeholder="Enter your current address"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="permanentAddress" className="text-sm font-semibold">
                    Permanent Address
                  </Label>
                  <Textarea
                    id="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={(e) => updateFormData("permanentAddress", e.target.value)}
                    placeholder="Enter your permanent address (if different from current)"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="phoneNumber" className="text-sm font-semibold">
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                      placeholder="Enter your phone number"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="Enter your email address"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="identificationNumber" className="text-sm font-semibold">
                    Identification Number *
                  </Label>
                  <Input
                    id="identificationNumber"
                    value={formData.identificationNumber}
                    onChange={(e) => updateFormData("identificationNumber", e.target.value)}
                    placeholder="Passport / IC / SSN"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Position Applied For */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="jobTitle" className="text-sm font-semibold">
                  Job Title / Position *
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  placeholder="Enter the position you're applying for"
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="expectedSalary" className="text-sm font-semibold">
                    Expected Salary
                  </Label>
                  <Input
                    id="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={(e) => updateFormData("expectedSalary", e.target.value)}
                    placeholder="e.g., $50,000 - $60,000"
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="availability" className="text-sm font-semibold">
                    Availability / Notice Period *
                  </Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => updateFormData("availability", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1-week">1 Week</SelectItem>
                      <SelectItem value="2-weeks">2 Weeks</SelectItem>
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="2-months">2 Months</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="preferredLocation" className="text-sm font-semibold">
                  Preferred Work Location
                </Label>
                <Input
                  id="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={(e) => updateFormData("preferredLocation", e.target.value)}
                  placeholder="e.g., New York, Remote, Hybrid"
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Step 3: Education Background */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="highestQualification" className="text-sm font-semibold">
                    Highest Qualification *
                  </Label>
                  <Select
                    value={formData.highestQualification}
                    onValueChange={(value) => updateFormData("highestQualification", value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="graduationYear" className="text-sm font-semibold">
                    Year of Graduation *
                  </Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    min="1950"
                    max="2030"
                    value={formData.graduationYear}
                    onChange={(e) => updateFormData("graduationYear", e.target.value)}
                    placeholder="e.g., 2020"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="institution" className="text-sm font-semibold">
                  Institution / University *
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => updateFormData("institution", e.target.value)}
                  placeholder="Enter institution name"
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="fieldOfStudy" className="text-sm font-semibold">
                  Field of Study / Major *
                </Label>
                <Input
                  id="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={(e) => updateFormData("fieldOfStudy", e.target.value)}
                  placeholder="e.g., Computer Science, Business Administration"
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="certifications" className="text-sm font-semibold">
                  Certifications / Additional Courses
                </Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => updateFormData("certifications", e.target.value)}
                  placeholder="List any relevant certifications, courses, or training programs"
                  className="min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 4: Work Experience */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="companyName" className="text-sm font-semibold">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData("companyName", e.target.value)}
                    placeholder="Enter company name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="position" className="text-sm font-semibold">
                    Position / Designation *
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => updateFormData("position", e.target.value)}
                    placeholder="Enter your job title"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="duration" className="text-sm font-semibold">
                  Duration (From – To) *
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => updateFormData("duration", e.target.value)}
                  placeholder="e.g., January 2020 - December 2023"
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="responsibilities" className="text-sm font-semibold">
                  Responsibilities / Achievements *
                </Label>
                <Textarea
                  id="responsibilities"
                  value={formData.responsibilities}
                  onChange={(e) => updateFormData("responsibilities", e.target.value)}
                  placeholder="Describe your key responsibilities and achievements in this role"
                  className="min-h-[120px]"
                  rows={5}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="reasonForLeaving" className="text-sm font-semibold">
                  Reason for Leaving
                </Label>
                <Input
                  id="reasonForLeaving"
                  value={formData.reasonForLeaving}
                  onChange={(e) => updateFormData("reasonForLeaving", e.target.value)}
                  placeholder="e.g., Career advancement, Relocation, Contract ended"
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              size="lg"
              className="h-12 px-6 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep} size="lg" className="h-12 px-6">
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} size="lg" className="h-12 px-6">
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
