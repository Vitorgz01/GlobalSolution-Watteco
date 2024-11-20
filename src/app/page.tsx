import Banner from "@/components/Banner";

import Feedback from "@/components/Feedback";
import Maps from "@/components/Maps";
import WatsonChat from "@/components/WatsonChat";

export default function Home() {
  return (
    <>
      <WatsonChat />
      <Banner />

      <Maps />

      <Feedback />
    </>
  );
}
