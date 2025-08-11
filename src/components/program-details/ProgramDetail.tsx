import {
    Award,
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    Euro,
    FileText,
    Globe,
    GraduationCap,
    Heart,
    Home,
    Info,
    Mail,
    MapPin,
    Phone,
    Plane,
    Shield,
    Star,
    Users
} from "lucide-react";
import type { Program } from "../../types/program.types";

interface ProgramDetailProps {
  program: Program;
}

const ProgramDetail = ({ program }: ProgramDetailProps) => {
  // Early return if program is not provided
  if (!program) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-gray-500 mb-4">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700">
              Program Not Found
            </h2>
            <p className="text-gray-600 mt-2">
              The requested program information is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to format currency in EUR (more relevant for international students)
  const formatTuition = (amount: number) => {
    const eurAmount = amount / 4.3; // Approximate PLN to EUR conversion
    return {
      pln: new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount),
      eur: new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(eurAmount),
    };
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to get level color and icon
  const getLevelInfo = (level: string) => {
    switch (level) {
      case "Bachelor":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: BookOpen,
        };
      case "Master":
        return {
          color: "bg-purple-100 text-purple-800 border-purple-200",
          icon: GraduationCap,
        };
      case "PhD":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Award,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: BookOpen,
        };
    }
  };

  const levelInfo = getLevelInfo(program.level);
  const LevelIcon = levelInfo.icon;
  const tuitionInfo = formatTuition(program.tuition);

  return (
    <div className="max-w-7xl mx-auto">
      {/* International Student Notice */}
      <div className="bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-red-700">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-semibold">Study in Poland</span>
          </div>
          <div className="text-gray-600 text-sm">
            Join thousands of international students in one of Europe's most
            welcoming countries for higher education
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="px-6 sm:px-8 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${levelInfo.color} bg-white/90 border`}>
                  <div className="flex items-center gap-1.5">
                    <LevelIcon className="w-4 h-4" />
                    {program.level} Program
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-300">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{program.rating}</span>
                  <span className="text-sm text-blue-200">
                    ({program.studentsCount}+ students)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-300 bg-white/20 rounded-full px-2 py-1 text-xs font-medium">
                  <Globe className="w-3 h-3" />
                  {program.language} Taught
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {program.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-blue-100 text-lg mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-medium">{program.university}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{program.city}, Poland</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
                <Plane className="w-4 h-4" />
                <span>
                  International students welcome • EU-recognized degree
                </span>
              </div>

              {/* Program Highlights in Hero */}
              {program.tags && program.tags.length > 0 && (
                <div className="mt-4">
                  <div className="text-blue-200 text-sm mb-3 font-medium">
                    Program Highlights:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {program.tags.slice(0, 6).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/30 hover:bg-white/30 transition-all duration-200">
                        {tag}
                      </span>
                    ))}
                    {program.tags.length > 6 && (
                      <span className="px-3 py-1 bg-white/10 text-blue-200 rounded-full text-xs">
                        +{program.tags.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:text-right">
              <div className="text-white/90 text-sm mb-2">
                Annual Tuition Fee
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {tuitionInfo.eur}
              </div>
              <div className="text-sm text-blue-200 mb-4">
                ({tuitionInfo.pln} PLN)
              </div>

              <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-3 text-center border border-white/30 mb-3">
                <div className="text-white/90 text-sm">
                  Application Deadline
                </div>
                <div className="text-white font-semibold flex items-center justify-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(program.nextDeadline)}
                </div>
              </div>

              <div className="text-xs text-blue-200">
                🇪🇺 EU citizens may qualify for reduced fees
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Program Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Program Overview
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold text-gray-900">
                    {program.duration}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Globe className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Language</div>
                  <div className="font-semibold text-gray-900">
                    {program.language}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">
                    International Students
                  </div>
                  <div className="font-semibold text-gray-900">
                    {Math.round(program.studentsCount * 0.3).toLocaleString()}+
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Recognition</div>
                  <div className="font-semibold text-gray-900">EU & Global</div>
                </div>
              </div>
            </div>

            {program.description && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  About This Program
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
              </div>
            )}
          </div>

          {/* International Student Information */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Plane className="w-5 h-5 text-blue-600" />
              For International Students
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    Visa Support
                  </div>
                  <div className="text-sm text-blue-700">
                    Complete assistance with student visa applications
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Home className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    Accommodation
                  </div>
                  <div className="text-sm text-blue-700">
                    Student dormitories and private housing options
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    Integration Programs
                  </div>
                  <div className="text-sm text-blue-700">
                    Orientation and cultural adaptation support
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Euro className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">
                    Scholarship Opportunities
                  </div>
                  <div className="text-sm text-blue-700">
                    Various funding options for international students
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 rounded-lg p-4">
              <div className="text-sm text-blue-800">
                <strong>Cost of Living in {program.city}:</strong> Approximately
                €400-600/month including accommodation, food, and local
                transport.
              </div>
            </div>
          </div>

          {/* Requirements */}
          {program.requirements && program.requirements.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Admission Requirements
              </h2>

              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-green-800">
                  <strong>For International Students:</strong> All foreign
                  academic documents must be officially translated and
                  recognized by Polish authorities.
                </div>
              </div>

              <div className="space-y-3">
                {program.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}

                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>English Proficiency:</strong> IELTS 6.0+ or TOEFL
                    80+ (if program taught in English)
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    <strong>Valid Passport:</strong> Must be valid for at least
                    18 months
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Start Your Journey
            </h3>

            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
                <FileText className="w-4 h-4" />
                Apply Now
              </button>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Info className="w-4 h-4" />
                Request Info Package
              </button>

              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                Download Brochure
              </button>
            </div>
          </div>

          {/* Key Information */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Quick Facts
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Program ID</span>
                <span className="font-semibold text-gray-900">
                  #{program.id}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Study Level</span>
                <span className="font-semibold text-gray-900">
                  {program.level}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold text-gray-900">
                  {program.city}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Next Deadline</span>
                <span className="font-semibold text-gray-900 text-xs">
                  {formatDate(program.nextDeadline)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">EU Recognition</span>
                <span className="font-semibold text-green-600">
                  ✓ Recognized
                </span>
              </div>
            </div>
          </div>

          {/* Support for International Students */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              International Support
            </h3>
            <p className="text-orange-800 text-sm mb-4">
              Dedicated support team for international students. Get help with
              applications, visas, and settling in Poland.
            </p>
            <div className="space-y-2">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                <Phone className="w-3 h-3" />
                Schedule Call
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-orange-700 font-semibold py-2 px-4 rounded-lg border border-orange-300 transition-colors text-sm flex items-center justify-center gap-2">
                <Mail className="w-3 h-3" />
                Email Advisor
              </button>
            </div>
          </div>

          {/* Poland Study Benefits */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">
              Why Study in Poland?
            </h3>
            <ul className="space-y-2 text-emerald-800 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                High-quality education at affordable costs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Safe and welcoming environment
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Gateway to European opportunities
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Rich cultural heritage & vibrant student life
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;