import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { isTeacher } from "@/lib/teacher";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
);


export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string}}
){
    try{
        const { userId } = auth();
        const courseId = params;
        if(!userId || !isTeacher(userId)){
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    }
                }
            }
        });

        if(!course){
            return new NextResponse("Not found", { status: 404 });
        }
// `       to delete a course we also need to delete its chapter videos so, that it does not take space;`
        for(const chapter of course.chapters){
            if(chapter.muxData?.assetId){
                await Video.Assets.del(chapter.muxData.assetId);
            }
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            },
        });
        
        return NextResponse.json(deletedCourse);

    }catch(error){
        console.log("COURSE_ID_DELETE", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string}}
){ 
    try{
        const { userId} = auth();
        const { courseId } = params;
        const values = await req.json();
        if(!userId || !isTeacher(userId)){
            return new NextResponse("Unauthenticated", { status: 401});
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        });
        return NextResponse.json(course);
    }catch(err){
        console.log("[COURSE_ID]", err);
        return new NextResponse("Internal Error", {status: 500});
    }
}