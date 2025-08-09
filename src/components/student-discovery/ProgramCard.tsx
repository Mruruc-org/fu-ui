import {ArrowRight, BookOpen, Clock, Euro, MapPin, Star, Users} from "lucide-react";
import type {Program} from "../../types/program.types";

interface ProgramCardProps {
    program: Program;
}

const ProgramCard = ({program}: ProgramCardProps) => (
    <div
        className="bg-white rounded-2xl shadow-md border border-gray-100/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
        <div
            className="h-48 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center relative">
            <BookOpen className="w-16 h-16 text-blue-500 opacity-60"/>
            <div
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-blue-800">
                {program.level.toUpperCase()}
            </div>
            <div
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                {program.language}
            </div>
        </div>

        {/* Program Details */}
        <div className="p-5">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {program.name}
                </h3>
                <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="w-5 h-5 fill-current"/>
                    <span className="text-sm font-bold text-gray-700">
            {program.rating}
          </span>
                </div>
            </div>
            <p className="text-gray-600 font-medium mb-4 text-sm">
                {program.university}
            </p>

            {/* Key Information Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400"/> {program.city}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400"/> {program.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-gray-400"/>
                    {program.studentsCount} students
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Euro className="w-4 h-4 text-gray-400"/> {program.tuition}/year
                </div>
            </div>

            {/* Program Highlights */}
            <div className="mb-5">
                <div className="flex flex-wrap gap-2">
                    {program.tags.map((highlight, index) => (
                        <span
                            key={index}
                            className="bg-blue-100/70 text-blue-800 px-2.5 py-1 rounded-full text-xs font-semibold">
              {highlight}
            </span>
                    ))}
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    Deadline:
                    <span className="font-bold text-red-600 ml-2">
            {program.nextDeadline}
          </span>
                </p>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
                    Details <ArrowRight className="w-4 h-4"/>
                </button>
            </div>
        </div>
    </div>
);

export default ProgramCard;
