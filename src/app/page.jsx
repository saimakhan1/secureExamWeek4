import AboutSection from "@/components/Home/AboutSection/page";
import CourseCategories from "@/components/Home/CourseCategories/page";
import Feature from "@/components/Home/Feature/Feature";
import LearnerResources from "@/components/Home/LearnerResources/LearnerResources";
import GetStarted from "@/components/Home/Get-Started/GetStarted";
import HomeHero from "@/components/Home/Home-Hero/HomeHero";
import Newsletter from "@/components/Home/Newsletter/page";
import PricingSection from "@/components/Home/PricingSection/page";
import Trusted from "@/components/Home/Trusted/Trusted";
import StudentReviews from "@/components/Home/StudentReviews/page";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <AboutSection></AboutSection>
      <Trusted />
      <CourseCategories></CourseCategories>
      <Feature />

      
      <PricingSection></PricingSection>
       <LearnerResources />
       <StudentReviews></StudentReviews>
      <GetStarted />
      <Newsletter></Newsletter>
    </div>
  );
}
