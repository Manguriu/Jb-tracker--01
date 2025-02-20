import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Lock } from 'lucide-react'




export default function Footer() {
  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your data is securely encrypted and stored. We never share your personal information or job application details with third parties. 
              Review our <a href="#" className="text-blue-600 hover:underline">privacy policy</a> for more information.
            </p>
          </CardContent>
        </Card>
    </div>
  )
}