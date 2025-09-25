"use client"

import React, { useEffect, useState } from "react"

interface Application {
  id: number
  fullName: string
  dateOfBirth: string
  gender: string
  nationality: string
  maritalStatus?: string
  currentAddress: string
  permanentAddress?: string
  phoneNumber: string
  email: string
  identificationNumber: string
  jobTitle: string
  expectedSalary?: string
  availability: string
  preferredLocation?: string
  highestQualification: string
  institution: string
  fieldOfStudy: string
  graduationYear: string
  certifications?: string
  companyName: string
  position: string
  duration: string
  responsibilities: string
  reasonForLeaving?: string
}

export function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch("http://localhost:5000/api/applications")
        if (!response.ok) {
          throw new Error("Failed to fetch applications")
        }
        const data = await response.json()
        setApplications(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [])

  if (loading) {
    return <div>Loading applications...</div>
  }

  if (error) {
    return <div>Error loading applications: {error}</div>
  }

  if (applications.length === 0) {
    return <div>No applications found.</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Employment Applications</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Full Name</th>
              <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Nationality</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Job Title</th>
              <th className="border border-gray-300 px-4 py-2">Company Name</th>
              <th className="border border-gray-300 px-4 py-2">Position</th>
              <th className="border border-gray-300 px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{app.id}</td>
                <td className="border border-gray-300 px-4 py-2">{app.fullName}</td>
                <td className="border border-gray-300 px-4 py-2">{app.dateOfBirth}</td>
                <td className="border border-gray-300 px-4 py-2">{app.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{app.nationality}</td>
                <td className="border border-gray-300 px-4 py-2">{app.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{app.email}</td>
                <td className="border border-gray-300 px-4 py-2">{app.jobTitle}</td>
                <td className="border border-gray-300 px-4 py-2">{app.companyName}</td>
                <td className="border border-gray-300 px-4 py-2">{app.position}</td>
                <td className="border border-gray-300 px-4 py-2">{app.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
