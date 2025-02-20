import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Book, FileText, Video, Link } from 'lucide-react'



export default function Resource() {
  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Job Search Resources
            </CardTitle>
            <CardDescription>Helpful tools and information for your job search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <FileText className="h-8 w-8 mb-2" />
                Resume Templates
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Video className="h-8 w-8 mb-2" />
                Interview Tips
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Link className="h-8 w-8 mb-2" />
                Job Board Links
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                <Book className="h-8 w-8 mb-2" />
                Career Guides
              </Button>
            </div>
          </CardContent>
        </Card>

    </div>
  )
}