// // // // app/api/student/result/route.js
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // // import { getCollection } from "@/lib/dbConnect";

// // // export async function GET() {
// // //   try {
// // //     const session = await getServerSession(authOptions);

// // //     if (!session || session.user.role !== "student") {
// // //       return new Response(JSON.stringify({ message: "Unauthorized" }), {
// // //         status: 401,
// // //       });
// // //     }

// // //     const submissionsCol = await getCollection("submissions");
// // //     const theoryQuestionsCol = await getCollection("theoryQuestions");
// // //     const mcqQuestionsCol = await getCollection("mcqQuestions");

// // //     // Fetch all submissions of this student
// // //     const submissions = await submissionsCol
// // //       .find({ studentEmail: session.user.email })
// // //       .sort({ createdAt: -1 })
// // //       .toArray();

// // //     const formattedResults = await Promise.all(
// // //       submissions.map(async (sub) => {
// // //         let totalMarks = 0;
// // //         let examType = sub.examType || "unknown";
// // //         const qMap = {};
// // //         const answersWithMarks = {};
// // //         const breakdownArray = [];

// // //         // Fetch theory questions if any
// // //         const theoryQuestions = await theoryQuestionsCol
// // //           .find({ examId: String(sub.examId) })
// // //           .toArray();

// // //         if (theoryQuestions.length > 0) {
// // //           examType = "theory";
// // //           theoryQuestions.forEach((q) => {
// // //             qMap[q._id.toString()] = q;
// // //             totalMarks += Number(q.marks || 0);
// // //           });
// // //         } else {
// // //           // fallback to MCQ
// // //           examType = "mcq";
// // //           if (sub.totalMarks) {
// // //             totalMarks = Number(sub.totalMarks);
// // //           } else {
// // //             const mcqQuestions = await mcqQuestionsCol
// // //               .find({ examId: String(sub.examId) })
// // //               .toArray();
// // //             mcqQuestions.forEach((q) => {
// // //               qMap[q._id.toString()] = q;
// // //               totalMarks += Number(q.marks || 0);
// // //             });
// // //           }
// // //         }

// // //         // Prepare answersWithMarks & breakdown
// // //         if (sub.answers) {
// // //           for (let qid in sub.answers) {
// // //             const question = qMap[qid];
// // //             const awarded = sub.scores?.[qid] ?? null;

// // //             answersWithMarks[qid] = {
// // //               questionText:
// // //                 question?.questionText ||
// // //                 question?.question ||
// // //                 "Question not found",
// // //               answer: sub.answers[qid],
// // //               maxMarks: question?.marks || 0,
// // //               awarded,
// // //             };

// // //             if (awarded !== null) {
// // //               breakdownArray.push(`Q: ${awarded}/${question?.marks || 0}`);
// // //             }
// // //           }
// // //         }

// // //         // Calculate total awarded marks
// // //         const awardedTotal = Object.values(sub.scores || {}).reduce(
// // //           (sum, val) => sum + (val || 0),
// // //           0,
// // //         );

// // //         return {
// // //           examId: sub.examId,
// // //           title: sub.examTitle || "Unknown Exam",
// // //           examType,
// // //           totalMarks,
// // //           marksObtained: sub.score ?? awardedTotal,
// // //           breakdown: breakdownArray.join(", "),
// // //           submittedAt: sub.createdAt,
// // //           status: sub.status || "graded",
// // //           gradedAt: sub.gradedAt || null,
// // //           score: sub.score ?? awardedTotal,
// // //           answersWithMarks,
// // //         };
// // //       }),
// // //     );

// // //     return new Response(JSON.stringify({ results: formattedResults }), {
// // //       status: 200,
// // //     });
// // //   } catch (err) {
// // //     console.error("Fetch student results error:", err);
// // //     return new Response(JSON.stringify({ message: "Server error" }), {
// // //       status: 500,
// // //     });
// // //   }
// // // }

// // //.........

// // // app/api/student/result/route.js
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import { getCollection } from "@/lib/dbConnect";

// // export async function GET() {
// //   try {
// //     const session = await getServerSession(authOptions);

// //     if (!session || session.user.role !== "student") {
// //       return new Response(JSON.stringify({ message: "Unauthorized" }), {
// //         status: 401,
// //       });
// //     }

// //     const submissionsCol = await getCollection("submissions");
// //     const theoryQuestionsCol = await getCollection("theoryQuestions");
// //     const mcqQuestionsCol = await getCollection("questions");

// //     // Fetch all submissions of this student
// //     const submissions = await submissionsCol
// //       .find({ studentEmail: session.user.email })
// //       .sort({ createdAt: -1 })
// //       .toArray();

// //     const formattedResults = await Promise.all(
// //       submissions.map(async (sub) => {
// //         let totalMarks = 0;
// //         let examType = sub.examType || "unknown";
// //         const qMap = {};
// //         const answersWithMarks = {};
// //         const breakdownArray = [];

// //         // Fetch theory questions if any
// //         const theoryQuestions = await theoryQuestionsCol
// //           .find({ examId: String(sub.examId) })
// //           .toArray();

// //         if (theoryQuestions.length > 0) {
// //           examType = "theory";
// //           theoryQuestions.forEach((q) => {
// //             qMap[q._id.toString()] = q;
// //             totalMarks += Number(q.marks || 0);
// //           });
// //         } else {
// //           // fallback to MCQ
// //           examType = "mcq";
// //           if (sub.totalMarks) {
// //             totalMarks = Number(sub.totalMarks);
// //           } else {
// //             const mcqQuestions = await mcqQuestionsCol
// //               .find({ examId: String(sub.examId) })
// //               .toArray();
// //             mcqQuestions.forEach((q) => {
// //               qMap[q._id.toString()] = q;
// //               totalMarks += Number(q.marks || 0);
// //             });
// //           }
// //         }

// //         // Prepare answersWithMarks & breakdown
// //         if (sub.answers) {
// //           for (let qid in sub.answers) {
// //             const question = qMap[qid];
// //             const awarded = sub.scores?.[qid] ?? null;

// //             answersWithMarks[qid] = {
// //               questionText:
// //                 question?.questionText ||
// //                 question?.question ||
// //                 "Question not found",
// //               answer: sub.answers[qid],
// //               maxMarks: question?.marks || 0,
// //               awarded,
// //             };

// //             if (awarded !== null) {
// //               breakdownArray.push(`Q: ${awarded}/${question?.marks || 0}`);
// //             }
// //           }
// //         }

// //         // Calculate total awarded marks
// //         const awardedTotal = Object.values(sub.scores || {}).reduce(
// //           (sum, val) => sum + (val || 0),
// //           0,
// //         );

// //         return {
// //           examId: sub.examId,
// //           title: sub.examTitle || "Unknown Exam",
// //           examType, // this is your existing field
// //           examCategory: examType, // NEW: explicit column for exam type
// //           totalMarks,
// //           marksObtained: sub.score ?? awardedTotal,
// //           breakdown: breakdownArray.join(", "),
// //           submittedAt: sub.createdAt,
// //           status: sub.status || "graded",
// //           gradedAt: sub.gradedAt || null,
// //           score: sub.score ?? awardedTotal,
// //           answersWithMarks,
// //         };
// //       }),
// //     );

// //     return new Response(JSON.stringify({ results: formattedResults }), {
// //       status: 200,
// //     });
// //   } catch (err) {
// //     console.error("Fetch student results error:", err);
// //     return new Response(JSON.stringify({ message: "Server error" }), {
// //       status: 500,
// //     });
// //   }
// // }

// //...

// // app/api/student/result/route.js
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getCollection } from "@/lib/dbConnect";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "student") {
//       return new Response(JSON.stringify({ message: "Unauthorized" }), {
//         status: 401,
//       });
//     }

//     const submissionsCol = await getCollection("submissions");
//     const theoryQuestionsCol = await getCollection("theoryQuestions");
//     const mcqQuestionsCol = await getCollection("questions"); // MCQs are here

//     // Fetch all submissions
//     const submissions = await submissionsCol
//       .find({ studentEmail: session.user.email })
//       .sort({ createdAt: -1 })
//       .toArray();

//     const formattedResults = await Promise.all(
//       submissions.map(async (sub) => {
//         let totalMarks = 0;
//         let examType = sub.examType || "unknown";
//         const qMap = {};
//         const answersWithMarks = {};
//         const breakdownArray = [];

//         // Fetch theory questions
//         const theoryQuestions = await theoryQuestionsCol
//           .find({ examId: String(sub.examId) })
//           .toArray();

//         if (theoryQuestions.length > 0) {
//           examType = "theory";
//           theoryQuestions.forEach((q) => {
//             qMap[q._id.toString()] = q;
//             totalMarks += Number(q.marks || 0);
//           });
//         } else {
//           // MCQ questions
//           examType = "mcq";
//           const mcqQuestions = await mcqQuestionsCol
//             .find({ examId: String(sub.examId) })
//             .toArray();

//           mcqQuestions.forEach((q) => {
//             qMap[q._id.toString()] = q;
//             totalMarks += Number(q.marks || 0);
//           });
//         }

//         // Map answers & marks
//         if (sub.answers) {
//           for (let qid in sub.answers) {
//             const question = qMap[qid];
//             const awarded = sub.scores?.[qid] ?? 0;

//             answersWithMarks[qid] = {
//               questionText: question?.questionText || "Question not found",
//               answer: sub.answers[qid],
//               maxMarks: question?.marks || 0,
//               awarded,
//               examType,
//               options: examType === "mcq" ? question?.options || [] : undefined,
//               correctOption:
//                 examType === "mcq" && question?.options
//                   ? question.options[question.correctOption]
//                   : undefined,
//             };

//             breakdownArray.push(`Q: ${awarded}/${question?.marks || 0}`);
//           }
//         }

//         const awardedTotal = Object.values(sub.scores || {}).reduce(
//           (sum, val) => sum + (val || 0),
//           0,
//         );

//         return {
//           examId: sub.examId,
//           title: sub.examTitle || "Unknown Exam",
//           examType,
//           examCategory: examType,
//           totalMarks,
//           marksObtained: sub.score ?? awardedTotal,
//           breakdown: breakdownArray.join(", "),
//           submittedAt: sub.createdAt,
//           status: sub.status || "graded",
//           gradedAt: sub.gradedAt || null,
//           score: sub.score ?? awardedTotal,
//           answersWithMarks,
//         };
//       }),
//     );

//     return new Response(JSON.stringify({ results: formattedResults }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error("Fetch student results error:", err);
//     return new Response(JSON.stringify({ message: "Server error" }), {
//       status: 500,
//     });
//   }
// }

//...

// app/api/student/result/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCollection } from "@/lib/dbConnect";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const submissionsCol = await getCollection("submissions");
    const theoryQuestionsCol = await getCollection("theoryQuestions");
    const mcqQuestionsCol = await getCollection("questions"); // MCQs collection

    const submissions = await submissionsCol
      .find({ studentEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const formattedResults = await Promise.all(
      submissions.map(async (sub) => {
        let totalMarks = 0;
        let examType = sub.examType || "unknown";
        const qMap = {};
        const answersWithMarks = {};
        const breakdownArray = [];

        // --- Fetch theory questions ---
        const theoryQuestions = await theoryQuestionsCol
          .find({ examId: String(sub.examId) })
          .toArray();

        if (theoryQuestions.length > 0) {
          examType = "theory";
          theoryQuestions.forEach((q) => {
            qMap[q._id.toString()] = q;
            totalMarks += Number(q.marks || 0);
          });
        } else {
          // --- MCQ questions ---
          examType = "mcq";
          const mcqQuestions = await mcqQuestionsCol
            .find({ examId: String(sub.examId) })
            .toArray();

          mcqQuestions.forEach((q) => {
            qMap[q._id.toString()] = q;
            totalMarks += Number(q.marks || 0);
          });
        }

        // --- Prepare answers & marks ---
        if (sub.answers) {
          for (let qid in sub.answers) {
            const question = qMap[qid];

            if (!question) {
              answersWithMarks[qid] = {
                questionText: "Question not found",
                answer: sub.answers[qid],
                awarded: 0,
                maxMarks: 0,
              };
              continue;
            }

            let awarded = 0;
            let answerText = sub.answers[qid];
            let correctAnswerText;

            if (examType === "mcq" && question.options) {
              const selectedIndex = sub.answers[qid];
              const correctIndex = question.correctOption;

              // Calculate awarded marks
              awarded =
                selectedIndex === correctIndex ? Number(question.marks) : 0;

              // Map indexes to text
              answerText = question.options[selectedIndex] ?? "No answer";
              correctAnswerText = question.options[correctIndex] ?? "N/A";
            } else {
              // Theory question
              awarded = sub.scores?.[qid] ?? 0;
              correctAnswerText = undefined; // not needed for theory
            }

            answersWithMarks[qid] = {
              questionText: question.questionText || "Question not found",
              answer: answerText,
              maxMarks: Number(question.marks || 0),
              awarded,
              correctAnswer: correctAnswerText,
              options: examType === "mcq" ? question.options : undefined,
            };

            breakdownArray.push(`Q: ${awarded}/${question?.marks || 0}`);
          }
        }

        // --- Total awarded marks ---
        let awardedTotal = 0;
        if (examType === "theory") {
          awardedTotal = Object.values(sub.scores || {}).reduce(
            (sum, val) => sum + (val || 0),
            0,
          );
        } else {
          // MCQ: sum from answersWithMarks
          awardedTotal = Object.values(answersWithMarks).reduce(
            (sum, val) => sum + (val.awarded || 0),
            0,
          );
        }

        return {
          examId: sub.examId,
          title: sub.examTitle || "Unknown Exam",
          examType,
          examCategory: examType, // explicit field for frontend
          totalMarks,
          marksObtained: sub.score ?? awardedTotal,
          breakdown: breakdownArray.join(", "),
          submittedAt: sub.createdAt,
          status: sub.status || "graded",
          gradedAt: sub.gradedAt || null,
          score: sub.score ?? awardedTotal,
          answersWithMarks,
        };
      }),
    );

    return new Response(JSON.stringify({ results: formattedResults }), {
      status: 200,
    });
  } catch (err) {
    console.error("Fetch student results error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
