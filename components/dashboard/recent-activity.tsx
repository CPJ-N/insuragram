import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
  {
    id: 1,
    type: "Policy Renewal",
    description: "Health Insurance policy renewed",
    date: "2 hours ago",
    initials: "HR",
  },
  {
    id: 2,
    type: "Claim Filed",
    description: "New claim submitted for car insurance",
    date: "1 day ago",
    initials: "CF",
  },
  {
    id: 3,
    type: "Document Upload",
    description: "Medical records uploaded",
    date: "2 days ago",
    initials: "DU",
  },
  {
    id: 4,
    type: "Payment",
    description: "Premium payment received",
    date: "3 days ago",
    initials: "PP",
  },
]

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{activity.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.type}</p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
} 