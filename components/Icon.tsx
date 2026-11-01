import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Shield,
  FileText,
  Building2,
  ArrowLeftRight,
  Home,
  Search,
  PhoneCall,
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  X,
  CheckCircle2,
  ClipboardList,
  Clock,
  Wrench,
  TrendingUp,
  MapPin,
  Snowflake,
  Droplets,
  Zap,
  Armchair,
  Wifi,
  Sparkles,
  MoreHorizontal,
  Flag,
  ThumbsUp,
  FileEdit,
  GitCommit,
  Package,
  Image as ImageIcon,
  ZoomIn,
  Download,
  Printer,
  AlertTriangle,
  CheckSquare,
  Hourglass,
  FilterX,
  Radio,
  User,
  History,
  LogOut,
  Map,
  Compass,
  AlertCircle,
  HelpCircle,
  Phone,
  HardHat,
  DoorClosed,
  Check,
  Calendar,
  Layers,
  Flame,
  ShieldAlert,
  Leaf,
  Megaphone,
  UploadCloud,
  Paperclip,
  BadgeCheck,
  MessageSquare,
  Share2,
  BellRing,
  Send,
  ArrowUpDown,
  Truck,
  SlidersHorizontal,
  RotateCw,
  UserX,
  FileSearch
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, size = 20, className = '', filled = false }: IconProps) {
  // Normalize name
  const iconKey = name.toLowerCase().trim().replace(/-/g, '_');

  const commonProps = {
    size,
    className: `inline-block shrink-0 ${className}`,
    strokeWidth: filled ? 2.5 : 2,
    ...(filled ? { fill: 'currentColor' } : {})
  };

  switch (iconKey) {
    // Navigation & General
    case 'dashboard':
      return <LayoutDashboard {...commonProps} />;
    case 'add_circle':
    case 'add':
      return <PlusCircle {...commonProps} />;
    case 'security':
    case 'shield':
      return <Shield {...commonProps} />;
    case 'shield_alert':
      return <ShieldAlert {...commonProps} />;
    case 'description':
      return <FileText {...commonProps} />;
    case 'apartment':
    case 'building':
    case 'domain':
      return <Building2 {...commonProps} />;
    case 'sync_alt':
    case 'swap':
      return <ArrowLeftRight {...commonProps} />;
    case 'home':
      return <Home {...commonProps} />;
    case 'search':
      return <Search {...commonProps} />;
    case 'manage_search':
      return <FileSearch {...commonProps} />;
    case 'phone_in_talk':
    case 'call':
    case 'phone':
      return <PhoneCall {...commonProps} />;
    case 'notifications':
    case 'notifications_active':
      return <Bell {...commonProps} />;
    case 'notification_important':
      return <BellRing {...commonProps} />;
    case 'expand_more':
      return <ChevronDown {...commonProps} />;
    case 'chevron_right':
      return <ChevronRight {...commonProps} />;
    case 'arrow_forward':
      return <ArrowRight {...commonProps} />;
    case 'arrow_back':
      return <ArrowLeft {...commonProps} />;
    case 'arrow_upward':
      return <ArrowUp {...commonProps} />;
    case 'close':
      return <X {...commonProps} />;
    case 'verified':
    case 'check_circle':
    case 'task_alt':
    case 'done_all':
      return <CheckCircle2 {...commonProps} />;
    case 'check':
      return <Check {...commonProps} />;
    case 'assignment':
    case 'assignment_turned_in':
      return <ClipboardList {...commonProps} />;
    case 'schedule':
    case 'timer':
      return <Clock {...commonProps} />;
    case 'engineering':
    case 'support_agent':
    case 'handyman':
    case 'plumbing':
      return <Wrench {...commonProps} />;
    case 'trending_up':
      return <TrendingUp {...commonProps} />;
    case 'location_on':
    case 'room':
    case 'pin_drop':
      return <MapPin {...commonProps} />;
    case 'ac_unit':
      return <Snowflake {...commonProps} />;
    case 'water_drop':
    case 'water_damage':
      return <Droplets {...commonProps} />;
    case 'electric_bolt':
    case 'bolt':
    case 'lightbulb':
      return <Zap {...commonProps} />;
    case 'chair':
      return <Armchair {...commonProps} />;
    case 'wifi':
    case 'wifi_tethering':
    case 'router':
      return <Wifi {...commonProps} />;
    case 'cleaning_services':
      return <Sparkles {...commonProps} />;
    case 'more_horiz':
      return <MoreHorizontal {...commonProps} />;
    case 'flag':
      return <Flag {...commonProps} />;
    case 'thumb_up':
      return <ThumbsUp {...commonProps} />;
    case 'edit_note':
      return <FileEdit {...commonProps} />;
    case 'timeline':
      return <GitCommit {...commonProps} />;
    case 'inventory_2':
      return <Package {...commonProps} />;
    case 'photo_library':
    case 'add_photo_alternate':
      return <ImageIcon {...commonProps} />;
    case 'zoom_in':
      return <ZoomIn {...commonProps} />;
    case 'download':
    case 'file_download':
      return <Download {...commonProps} />;
    case 'print':
      return <Printer {...commonProps} />;
    case 'emergency_home':
    case 'warning':
    case 'emergency':
      return <AlertTriangle {...commonProps} />;
    case 'pending':
    case 'pending_actions':
      return <Hourglass {...commonProps} />;
    case 'filter_alt_off':
      return <FilterX {...commonProps} />;
    case 'radio':
      return <Radio {...commonProps} />;
    case 'person':
    case 'profile':
      return <User {...commonProps} />;
    case 'person_off':
      return <UserX {...commonProps} />;
    case 'badge':
      return <BadgeCheck {...commonProps} />;
    case 'history':
    case 'history_toggle_off':
      return <History {...commonProps} />;
    case 'logout':
      return <LogOut {...commonProps} />;
    case 'map':
      return <Map {...commonProps} />;
    case 'explore':
      return <Compass {...commonProps} />;
    case 'energy_savings_leaf':
    case 'leaf':
      return <Leaf {...commonProps} />;
    case 'campaign':
      return <Megaphone {...commonProps} />;
    case 'help_outline':
    case 'help':
      return <HelpCircle {...commonProps} />;
    case 'cloud_upload':
      return <UploadCloud {...commonProps} />;
    case 'attach_file':
      return <Paperclip {...commonProps} />;
    case 'chat':
    case 'chat_bubble_outline':
      return <MessageSquare {...commonProps} />;
    case 'share':
      return <Share2 {...commonProps} />;
    case 'send':
      return <Send {...commonProps} />;
    case 'elevator':
      return <ArrowUpDown {...commonProps} />;
    case 'local_shipping':
      return <Truck {...commonProps} />;
    case 'tune':
      return <SlidersHorizontal {...commonProps} />;
    case 'refresh':
      return <RotateCw {...commonProps} />;
    default:
      return <AlertCircle {...commonProps} />;
  }
}

