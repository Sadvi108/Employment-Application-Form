import { EmploymentApplicationForm } from "@/components/employment-application-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">Employment Application</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Join our team by completing this comprehensive application. All information is confidential and will be
              used exclusively for employment consideration.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <EmploymentApplicationForm />
        </div>
      </div>
    </main>
  )
}
