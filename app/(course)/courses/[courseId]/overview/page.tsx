import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ReadText from "@/components/custom/ReadText";

const CourseOverview = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <div className="px-4 py-4 flex flex-col gap-5 text-sm  sm:px-6 lg:px-8">
      {/* Top section divided into two parts */}
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-8">
        {/* Left side: Title, instructor, and description */}
        <div className="flex-1">
          <h1 className="text-2xl  sm:text-3xl  font-bold">{course.title}</h1>
          <hr className="border-t-2 border-gray-300 my-4" />  {/* Horizontal line */}
          <p className="font-medium text-lg sm:text-xl">{course.subtitle}</p>

          <div className="flex gap-2 items-center mt-4">
            <Image
              src={
                instructor.imageUrl
                  ? instructor.imageUrl
                  : "/avatar_placeholder.jpg"
              }
              alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
              width={40}
              height={40}
              className="rounded-full"
            />
            
            <p className="text-lg sm:text-xl font-bold">Mentor: {instructor.fullName}</p>
          </div>

          {/* Description directly under the instructor's name */}
          <div className="mt-4">
            <ReadText value={course.description!} />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-lg sm:text-xl text-gray-500 font-bold">Level:</p>
            <p className="text-xl sm:text-2xl font-bold">{level?.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-gray-500 text-lg sm:text-xl">Price:</p>
            <p className="text-xl sm:text-2xl font-bold">₹{course.price}</p>
          </div>
        </div>

        {/* Right side: Course image */}
        <div className="flex justify-center lg:justify-end items-center lg:items-start">
          <Image
            src="/teacher.jpg"
            alt={course.title}
            width={300}     
            height={150}   
            layout="fixed"  
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
