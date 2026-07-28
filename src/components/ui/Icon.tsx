import React from 'react';
import {
  BookOpen, Atom, Languages, Leaf, Users, GraduationCap, Building, Trophy, Star, Bell,
  Building2, FlaskConical, Monitor, Library, Compass, Flag, Bot,
  Music, Music2, Target, PenTool, Heart, MessageSquare, Crosshair,
  Phone, Mail, MapPin, Clock, Calendar, ChevronRight, ChevronLeft,
  Menu, X, Search, Sun, Moon, ArrowRight, ArrowUp, ArrowDown, ExternalLink,
  Play, ChevronDown, Quote, Image, Film, Camera, Send,
  MessageCircle, PhoneCall, Check, AlertCircle, Info, Bookmark,
  Footprints, Eye, Trash2, Settings, Sliders, FileText, GripVertical,
  Inbox, RefreshCw, Save, Plus, Lock, LogIn, EyeOff, type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  atom: Atom,
  languages: Languages,
  leaf: Leaf,
  users: Users,
  'graduation-cap': GraduationCap,
  building: Building,
  trophy: Trophy,
  star: Star,
  'building-2': Building2,
  'flask-conical': FlaskConical,
  monitor: Monitor,
  library: Library,
  mosque: Building,
  football: Footprints,
  compass: Compass,
  flag: Flag,
  bot: Bot,
  music: Music,
  'music-2': Music2,
  target: Target,
  bell: Bell,
  'pen-tool': PenTool,
  'trash-2': Trash2,
  settings: Settings,
  sliders: Sliders,
  heart: Heart,
  'message-square': MessageSquare,
  crosshair: Crosshair,
  phone: Phone,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock,
  calendar: Calendar,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  menu: Menu,
  x: X,
  search: Search,
  sun: Sun,
  moon: Moon,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  external: ExternalLink,
  play: Play,
  'chevron-down': ChevronDown,
  quote: Quote,
  image: Image,
  film: Film,
  camera: Camera,
  send: Send,
  'message-circle': MessageCircle,
  'phone-call': PhoneCall,
  check: Check,
  'arrow-down': ArrowDown,
  'file-text': FileText,
  'alert-circle': AlertCircle,
  info: Info,
  bookmark: Bookmark,
  eye: Eye,
  'grip-vertical': GripVertical,
  inbox: Inbox,
  'refresh-cw': RefreshCw,
  save: Save,
  plus: Plus,
  lock: Lock,
  'log-in': LogIn,
  'eye-off': EyeOff,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size = 20 }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
}
