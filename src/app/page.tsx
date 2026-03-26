'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Phone, 
  Target, 
  Zap, 
  User, 
  MessageSquare, 
  FileText, 
  CheckSquare, 
  History, 
  Calendar, 
  Clock,
  UserCheck,
  PhoneCall,
  MessageCircle,
  Building2,
  BarChart3,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Timer,
  LogOut,
  Loader2
} from 'lucide-react'

type StepContent = {
  id: string
  title: string
  icon: React.ReactNode
  content: string
  sections?: Array<{
    title: string
    content: string
    imagePrompt?: string
  }>
  functions?: Array<{
    name: string
    description: string
    imagePrompt: string
    icon?: React.ReactNode
  }>
}

const stepsData: StepContent[] = [
  {
    id: 'step1',
    title: 'Morning Check-In',
    icon: <UserCheck className="h-5 w-5" />,
    content: 'When you first open the app and log in for the day, you will be instantly greeted by the Daily Welcome Modal.',
    sections: [
      {
        title: 'Daily Welcome Modal',
        content: 'The pop-up will show you who the current Top Performer of the Month is, complete with their total disbursed amount and a highly-visible floating flower animation to celebrate them.',
        imagePrompt: 'professional CRM dashboard showing welcome modal with top performer information and celebration animation'
      },
      {
        title: 'Set Your Intention',
        content: 'The system greets you by name ("Good Morning, [Your Name]!☀️"). At the bottom, it asks: "Who will be the next Top Performer?" Enter your name to officially start your day.',
        imagePrompt: 'telecaller app welcome screen with name input field and "Who will be the next Top Performer?" question'
      },
      {
        title: 'Mark Your Attendance',
        content: 'Navigate to the Attendance widget on your Dashboard. Click the big "Check In Now" button. The system will ask for Location permissions - you must click Allow.',
        imagePrompt: 'telecaller attendance dashboard with check-in button and location permission request modal'
      },
      {
        title: 'Idle Timer Feature',
        content: 'Your live background timer has started! If you step away for more than 5 minutes without pausing, the system will detect no mouse/keyboard movement and display a yellow warning banner.',
        imagePrompt: 'telecaller screen showing idle timer warning banner after 5 minutes of inactivity'
      }
    ]
  },
  {
    id: 'step2',
    title: 'Daily Targets & Pipeline',
    icon: <Target className="h-5 w-5" />,
    content: 'Before you start dialing, look closely at your Dashboard to understand your goals and pipeline.',
    sections: [
      {
        title: 'Monthly Goal Widget',
        content: 'Includes real-time pacing indicators. If you are behind schedule, it will explicitly warn you. View your Est. Incentive earnings based on successful loan disbursements.',
        imagePrompt: 'telecaller dashboard monthly goal widget with progress bar and incentive tracker'
      },
      {
        title: 'Daily Call Target',
        content: 'Your standard daily goal is 350 calls. The progress bar tracks your live dials. If you fall behind, the widget turns red and alerts you!',
        imagePrompt: 'telecaller daily call target widget showing 350 calls goal with red alert warning'
      },
      {
        title: 'Pending Tasks Widget',
        content: 'View tasks and scheduled callbacks marked Overdue (Red) that you must handle first. Also lists who you need to call "Today" and "Tomorrow".',
        imagePrompt: 'telecaller sidebar widget showing pending tasks with overdue red badges'
      },
      {
        title: 'Performance Charts',
        content: 'View dynamic line charts tracking your conversion success rates so you know if your pitch is working.',
        imagePrompt: 'telecaller dashboard with line charts showing conversion success rates over time'
      }
    ]
  },
  {
    id: 'step3',
    title: 'Start Calling',
    icon: <PhoneCall className="h-5 w-5" />,
    content: 'Two methods to start making calls: Global Auto Dialer (recommended) or Manual selection from My Leads page.',
    sections: [
      {
        title: 'Global Auto Dialer',
        content: 'Change your Agent Status from "Offline" to "Ready for Calls". The system automatically finds highest priority leads and uses Click-To-Call to dial. Your mobile rings first, then connects to customer.',
        imagePrompt: 'telecaller agent status bar with dropdown showing Ready for Calls option'
      },
      {
        title: 'Auto-Routing to Customer Profile',
        content: 'When the call connects, the CRM instantly routes your screen to that specific customer\'s profile page so you have all their details right in front of you.',
        imagePrompt: 'telecaller customer profile page showing during an active call with all lead information'
      },
      {
        title: 'Wrap-up Mode Timer',
        content: 'When you hang up, a 10-second timer starts. Use this time to quickly type their outcome. Once 10 seconds pass, the dialer automatically calls the next person!',
        imagePrompt: 'telecaller screen showing 10-second wrap-up timer after call ends'
      },
      {
        title: 'My Leads Analytics Dashboard',
        content: 'Five color-coded metric cards: Total Assigned (Blue), New Pending (Amber), Contacted (Purple) with % Coverage, Logins (Orange), and Disbursed (Green).',
        imagePrompt: 'telecaller leads page showing five analytics cards with different colors and metrics'
      },
      {
        title: 'Lead Filters & Search',
        content: 'Universal Search Bar to find customers by Name, Phone, Email, or Company. Dropdown filters by Status or Priority. Data count badge shows results.',
        imagePrompt: 'telecaller leads page with search bar, dropdown filters, and data count badge'
      },
      {
        title: 'One-Click Row Actions',
        content: 'Click green Message icon for WhatsApp, Phone Missed icon for One-Click NR (instantly marks as No Response and schedules callback). Click Update button or Phone icon to call.',
        imagePrompt: 'telecaller leads table row showing hover actions with message, missed call, and update buttons'
      }
    ]
  },
  {
    id: 'step4',
    title: 'Lead Profile Page',
    icon: <User className="h-5 w-5" />,
    content: 'When you click on a customer or when Auto-Dialer connects, you\'re routed to their Lead Profile Page - split into two columns.',
    sections: [
      {
        title: 'Left Column - Editable Information',
        content: 'Edit Company, Designation, Loan Type, and Loan Amount right here. Click Save Changes immediately if customer updates their information.',
        imagePrompt: 'telecaller lead profile left column showing editable customer information fields'
      },
      {
        title: 'Live Script Engine',
        content: 'System automatically generates dynamic reading script based on Your Name, Customer\'s Name, and their Requested Loan Type. Read it verbatim if you get nervous!',
        imagePrompt: 'telecaller lead profile showing dynamically generated call script with customer details'
      },
      {
        title: 'History Tabs',
        content: 'Four tabs below the script: Timeline (visual history), Notes (past remarks), Calls (log of every phone attempt), Follow-ups (scheduled callbacks).',
        imagePrompt: 'telecaller lead profile with four history tabs: Timeline, Notes, Calls, Follow-ups'
      },
      {
        title: 'Right Column - Manager Escalation',
        content: 'Hit the red "Escalate to Manager" button to instantly alert your superior if customer is angry or asks for discount you can\'t authorize.',
        imagePrompt: 'telecaller lead profile right column with red escalate to manager button'
      },
      {
        title: 'Live WhatsApp Panel',
        content: 'Chat with customer on WhatsApp directly through the embedded window on this page without pulling out your phone.',
        imagePrompt: 'telecaller lead profile showing embedded WhatsApp chat panel'
      },
      {
        title: 'Transfer to KYC Module',
        content: 'Locked by default. ONLY unlocks when you change customer status to "Login Done". Select specific KYC Team Member from dropdown and formally transfer the file.',
        imagePrompt: 'telecaller lead profile showing KYC module transfer dropdown after login done status'
      }
    ]
  },
  {
    id: 'step5',
    title: 'Call Popup & Logging',
    icon: <MessageSquare className="h-5 w-5" />,
    content: 'Whenever on an active call, a status window pops up. Built for maximum speed with quick actions.',
    sections: [
      {
        title: 'Live Call Timer',
        content: 'Pulsing red "Live Recording" timer explicitly tracking your call duration. If glitch, manually override the MM/SS duration text boxes.',
        imagePrompt: 'telecaller call popup showing pulsing red live recording timer'
      },
      {
        title: 'Quick Actions During Call',
        content: 'Hover over icons to Copy Number, jump to WhatsApp Chat, or fire off automated "Sorry we missed you" WhatsApp text.',
        imagePrompt: 'telecaller call popup showing quick action icons for copy, WhatsApp, and missed call'
      },
      {
        title: 'Quick Notes Shortcuts',
        content: 'Click grey pill badges (Busy, Call Later, Switch Off, Docs Pending) and system instantly appends text into Remarks box!',
        imagePrompt: 'telecaller call popup showing quick note pill badges like Busy, Call Later, Switch Off'
      },
      {
        title: 'Outcome: Interested / Docs Pending',
        content: 'CRM automatically WhatsApps them an official KYC Document Request template! Prompts to open WhatsApp Web for personal follow-up.',
        imagePrompt: 'telecaller call popup showing Interested/Docs Pending outcome selected with WhatsApp automation'
      },
      {
        title: 'Outcome: Login',
        content: 'Strictly required to enter precise Loan Amount. Click +5L, +10L chips to enter amounts in one second.',
        imagePrompt: 'telecaller call popup showing Login outcome with loan amount chips (+5L, +10L)'
      },
      {
        title: 'Outcome: Disbursed',
        content: 'Required to enter final Loan Amount for incentive tracking. When saved, green celebration pulse visual effect triggers!',
        imagePrompt: 'telecaller call popup showing Disbursed outcome with green celebration animation'
      },
      {
        title: 'Outcome: Call Back',
        content: 'Secondary modal appears. Click +1 Hr, Evening, or Tomorrow to set exact reminder without calendar picker.',
        imagePrompt: 'telecaller call popup showing callback modal with quick time options (+1 Hr, Evening, Tomorrow)'
      },
      {
        title: 'Outcome: Not Eligible',
        content: 'Required to select specific radio button: "Salary in CASH", "Low CIBIL Score", or "Other".',
        imagePrompt: 'telecaller call popup showing Not Eligible outcome with radio button options'
      },
      {
        title: 'Keyboard Shortcut',
        content: 'Press Ctrl+Enter (or Cmd+Enter on Mac) to instantly hit "Submit" button without clicking.',
        imagePrompt: 'telecaller call popup showing Ctrl+Enter keyboard shortcut hint'
      },
      {
        title: 'Auto-Load Next Lead',
        content: 'Check "Auto-load next lead" box to save outcome, log metrics, close popup, and immediately open next pending lead!',
        imagePrompt: 'telecaller call popup showing auto-load next lead checkbox at bottom'
      }
    ]
  },
  {
    id: 'step6',
    title: 'Managing Bank Files (Logins)',
    icon: <FileText className="h-5 w-5" />,
    content: 'The holy grail of your job is getting files to the bank. Leads reach "Login Done" status and transfer to Logins Page.',
    sections: [
      {
        title: 'Daily Goal Widget',
        content: 'Circular progress tracker in top right corner tracks Daily Goal (default 5 logins). Watch circle fill with indigo color as you submit files!',
        imagePrompt: 'telecaller logins page showing circular daily goal progress widget'
      },
      {
        title: 'Live Duplicate Checking',
        content: 'As you type 10-digit mobile number, spinning wheel searches entire company database. Green box = Clean. Red box = Duplicate Lead with warning!',
        imagePrompt: 'telecaller new login form showing duplicate checking with red warning for duplicate lead'
      },
      {
        title: 'Logins Table - Tabs & Search',
        content: 'Toggle between "Today\'s Logins" and "History (Month)". Use universal search bar to find old files.',
        imagePrompt: 'telecaller logins table showing tabs for Today and History with search bar'
      },
      {
        title: 'Logins Table - Status Badges',
        content: 'Files start with Amber "Pending" badge. Update with ✅ Approve or ❌ Reject buttons to finalize your login.',
        imagePrompt: 'telecaller logins table row showing pending badge with approve and reject action buttons'
      },
      {
        title: 'Pending Pop-up Warning',
        content: 'If you have records stuck in "Pending" from previous days, massive warning modal blocks your screen with instant Approval/Rejection action buttons!',
        imagePrompt: 'telecaller logins page showing large warning modal for pending files from previous days'
      }
    ]
  },
  {
    id: 'step7',
    title: 'Organization & History',
    icon: <BarChart3 className="h-5 w-5" />,
    content: 'Dedicated pages in your sidebar to keep you organized throughout the day: Tasks, Calls, Notes, Chat.',
    sections: [
      {
        title: 'Daily Tasks - 4 Buckets',
        content: 'Tasks visually segmented into: Overdue (Red), Today (Blue), Tomorrow (Green), and Upcoming (Purple) summary cards.',
        imagePrompt: 'telecaller tasks page showing four colored summary cards for Overdue, Today, Tomorrow, Upcoming'
      },
      {
        title: 'Task Card Actions',
        content: 'Click "Call Now" to dial instantly. Click "Mark Done" to check off. Or click "View Lead" to jump to profile.',
        imagePrompt: 'telecaller task card showing Call Now, Mark Done, and View Lead action buttons'
      },
      {
        title: 'Call History - Global Analytics',
        content: 'Top row cards show all-time Total Calls, Completed Calls, Avg Duration (e.g. 5:30), and count of Upcoming scheduled calls.',
        imagePrompt: 'telecaller call history page showing global analytics cards with metrics'
      },
      {
        title: 'Call History - Today\'s Metrics',
        content: 'Second row isolates today\'s performance: Today\'s Calls, NR Today, NI Today, and Today\'s Total Duration.',
        imagePrompt: 'telecaller call history page showing today\'s metrics cards'
      },
      {
        title: 'Call Logs List',
        content: 'Every call tracked in list with color-coded badges: "Missed", "Completed", "Busy", and ultimate result (e.g. "Successful").',
        imagePrompt: 'telecaller call logs list showing color-coded status badges and results'
      },
      {
        title: 'Follow-ups - Dual Lists',
        content: 'Split into Scheduled Follow-ups (upcoming) and Overdue Follow-ups (pulsing red cards demanding immediate attention).',
        imagePrompt: 'telecaller follow-ups page showing split view of scheduled and overdue follow-up lists'
      },
      {
        title: 'Follow-up Card Details',
        content: 'Shows who to call, company, precisely when (e.g. "Today, 02:30 PM"), and text notes from last call context.',
        imagePrompt: 'telecaller follow-up card showing customer details, time, and context notes'
      },
      {
        title: 'My Notes - Analytics Cards',
        content: 'Track Total Notes ever recorded, This Week count, and unique Leads with Notes documented.',
        imagePrompt: 'telecaller notes page showing analytics cards for Total Notes, This Week, and Leads with Notes'
      },
      {
        title: 'My Notes - Global Feed',
        content: 'Chronological feed with color-coded identifier badges: Blue = Call, Green = Meeting, Orange = Follow Up, Red = Concern, Purple = Opportunity.',
        imagePrompt: 'telecaller notes global feed showing color-coded badges by interaction type'
      },
      {
        title: 'Team Chat',
        content: 'Real-time team chat works like Slack/Discord. See profile pictures, timestamps, and scroll back through history.',
        imagePrompt: 'telecaller team chat interface showing message thread with profile pictures and timestamps'
      }
    ]
  },
  {
    id: 'step8',
    title: 'Managing Your Shifts',
    icon: <Clock className="h-5 w-5" />,
    content: 'Your time is tracked meticulously by the minute. Advanced Attendance Portal shows exactly where you stand.',
    sections: [
      {
        title: '9-Hour Progress Bar',
        content: 'Thin strip at top of "Today\'s Status" card acts as progress bar. Fills based on standard 9-hour shift. Turns Green when you hit required hours!',
        imagePrompt: 'telecaller attendance page showing 9-hour progress bar that turns green when complete'
      },
      {
        title: 'Visual Timeline',
        content: 'Vertical timeline mapping your day. Shows when you clicked Check-in, if currently on Lunch (Active badge), and when expected to check out.',
        imagePrompt: 'telecaller attendance page showing vertical timeline with check-in, lunch, and expected check-out'
      },
      {
        title: 'Live Ticker & Idle Tracker',
        content: 'Massive digital clock ticks up "Total Logged Time". If no mouse movement for 5 minutes, yellow "Idle for 5m" badge appears!',
        imagePrompt: 'telecaller attendance page showing live ticker clock and idle warning badge'
      },
      {
        title: 'Holiday Banners',
        content: 'If log in on Sunday, Public Holiday, or Second Saturday, massive purple banner with party popper appears telling you to enjoy your day off!',
        imagePrompt: 'telecaller attendance page showing purple holiday banner with celebration icon'
      },
      {
        title: 'Taking a Break',
        content: 'Change Agent Status to "Lunch Break". Go to Attendance page and click "Lunch" button to stop active work timer. Click "End Break" when you return.',
        imagePrompt: 'telecaller attendance page showing lunch break button and active timer'
      },
      {
        title: 'Clocking Out',
        content: 'Click black "Check Out" button. Modal pops up asking for optional end-of-day summary note. Click Confirm to end shift.',
        imagePrompt: 'telecaller attendance check-out modal with summary note text field'
      },
      {
        title: 'Historical Table',
        content: 'Massive table listing every day of month: Check-In, Check-Out, Total Hours, and Color-Coded Status Badges (Green = Present, Yellow = Late, Red = Absent, Purple = Holiday).',
        imagePrompt: 'telecaller attendance history table showing daily records with color-coded status badges'
      },
      {
        title: 'Leave Entitlement Dashboard',
        content: 'Top row 4 cards display remaining allowances: Casual, Sick, Paid, Emergency. Each has progress bar that turns Amber or Red as you run out.',
        imagePrompt: 'telecaller leave page showing entitlement dashboard cards with progress bars'
      },
      {
        title: 'Submitting Leave Request',
        content: 'Click "New Request". Choose category, select dates. System instantly calculates business days requested. Red warning if requesting more than available!',
        imagePrompt: 'telecaller leave request form showing category selection, date picker, and business day calculation'
      },
      {
        title: 'Application Tracking',
        content: 'Request drops into History Feed with Amber "Pending" badge. Check back for Emerald "Approved" or Red "Rejected" badge.',
        imagePrompt: 'telecaller leave history feed showing pending, approved, and rejected status badges'
      }
    ]
  }
]

export default function TelecallerGuidePresentation() {
  const [activeStep, setActiveStep] = useState('step1')
  const [activeSection, setActiveSection] = useState(0)
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({})
  const [checkingImages, setCheckingImages] = useState<Record<string, boolean>>({})

  const currentStep = stepsData.find(s => s.id === activeStep)
  const currentSection = currentStep?.sections?.[activeSection]
  const sectionId = `${currentStep?.id}-${activeSection}`

  // Check if image exists for current section
  useEffect(() => {
    const checkImageExists = async () => {
      if (!sectionId) return
      
      setCheckingImages(prev => ({ ...prev, [sectionId]: true }))
      try {
        const safeName = sectionId.replace(/[^a-zA-Z0-9-]/g, '_')
        const imageUrl = `/presentation-images/telecaller_${safeName}.png`
        
        // Use a direct HEAD request to verify file exists from public assets (better for Vercel)
        const response = await fetch(imageUrl, { method: 'HEAD' })
        
        if (response.ok) {
          setGeneratedImages(prev => ({ ...prev, [sectionId]: imageUrl }))
        } else {
          // If HEAD fails, the file likely doesn't exist
          setGeneratedImages(prev => {
            const next = { ...prev }
            delete next[sectionId]
            return next
          })
        }
      } catch (error) {
        console.error('Error checking image:', error)
      } finally {
        setCheckingImages(prev => ({ ...prev, [sectionId]: false }))
      }
    }

    checkImageExists()
  }, [sectionId])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Phone className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Telecaller User Guide</h1>
              <p className="text-emerald-100 text-sm md:text-base">A Day in the Life (Ultimate Edition)</p>
            </div>
          </div>
          <p className="mt-3 text-emerald-100/80 text-sm max-w-3xl">
            Follow these steps from the moment you sit at your desk to the moment you leave. 
            Click on any function below to see its detailed explanation.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Step Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg border-l-4 border-l-emerald-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                  <nav className="space-y-1">
                    {stepsData.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => {
                          setActiveStep(step.id)
                          setActiveSection(0)
                        }}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                          activeStep === step.id
                            ? 'bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500 shadow-md'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-transparent'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          activeStep === step.id
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {step.icon}
                            <span className="truncate">{step.title}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Step Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Step Header */}
            <Card className="shadow-lg border-t-4 border-t-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900 p-3 rounded-xl">
                    {currentStep?.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{currentStep?.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {currentStep?.content}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-sm px-4 py-2">
                    {stepsData.findIndex(s => s.id === activeStep) + 1} of {stepsData.length}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Sections / Functions */}
            {currentStep?.sections && currentStep.sections.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Settings className="h-5 w-5 text-emerald-500" />
                    Key Functions
                  </CardTitle>
                  <CardDescription>
                    Click on any function to see detailed explanation and screenshot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentStep.sections.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSection(index)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          activeSection === index
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-md'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            activeSection === index
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {section.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                              {section.content}
                            </p>
                          </div>
                          {activeSection === index && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Section Detail */}
            {currentStep?.sections && currentStep.sections[activeSection] && (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        {currentStep.sections[activeSection].title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      {currentStep.sections[activeSection].content}
                    </p>
                  </div>

                  <Separator />

                  {/* Screenshot Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                      <Timer className="h-5 w-5 text-emerald-500" />
                      Screenshot Preview
                    </h3>
                    <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700">
                      {generatedImages[sectionId] ? (
                        <img
                          src={generatedImages[sectionId]}
                          alt={currentStep.sections[activeSection].title}
                          className="w-full h-full object-cover"
                        />
                      ) : checkingImages[sectionId] ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6">
                          <Loader2 className="h-16 w-16 text-emerald-500 mb-4 animate-spin" />
                          <p className="text-center text-lg font-semibold">Loading screenshot...</p>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6">
                          <MessageCircle className="h-16 w-16 text-emerald-500 mb-4" />
                          <p className="text-center text-lg font-semibold mb-2">
                            {currentStep.sections[activeSection].title}
                          </p>
                          <p className="text-center text-slate-400 text-sm max-w-md mb-4">
                            Screenshot not available yet
                          </p>
                          <p className="text-center text-emerald-400 text-sm italic max-w-md mb-4">
                            "{currentStep.sections[activeSection].imagePrompt}"
                          </p>
                          <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                            <p className="text-xs text-slate-300 text-center">
                              <strong>To add a screenshot:</strong> Place an image file named<br/>
                              <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400">telecaller_{sectionId}.png</code><br/>
                              in the <code className="bg-slate-800 px-2 py-1 rounded text-emerald-400">public/presentation-images</code> folder
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                      {generatedImages[sectionId] 
                        ? '✅ Screenshot displayed above'
                        : '🖼️ Screenshot will appear once added to the presentation-images folder'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => {
                  const currentIndex = stepsData.findIndex(s => s.id === activeStep)
                  if (currentIndex > 0) {
                    const prevStep = stepsData[currentIndex - 1]
                    setActiveStep(prevStep.id)
                    setActiveSection(0)
                  }
                }}
                disabled={stepsData.findIndex(s => s.id === activeStep) === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-emerald-500 dark:hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                <span className="text-lg">←</span>
                Previous Step
              </button>

              <div className="flex items-center gap-2">
                {stepsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveStep(stepsData[index].id)
                      setActiveSection(0)
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      stepsData[index].id === activeStep
                        ? 'bg-emerald-500 w-6'
                        : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  const currentIndex = stepsData.findIndex(s => s.id === activeStep)
                  if (currentIndex < stepsData.length - 1) {
                    const nextStep = stepsData[currentIndex + 1]
                    setActiveStep(nextStep.id)
                    setActiveSection(0)
                  }
                }}
                disabled={stepsData.findIndex(s => s.id === activeStep) === stepsData.length - 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Phone className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Telecaller Portal Guide</p>
                <p className="text-sm text-slate-400">Complete reference for all features</p>
              </div>
            </div>
            <div className="text-sm text-slate-500">
              {stepsData.length} Steps • {stepsData.reduce((acc, step) => acc + (step.sections?.length || 0), 0)} Functions
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
