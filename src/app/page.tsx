import Banner from "@/components/Banner";

import Info from "@/components/Info";
import Maps from "@/components/Maps";
import WatsonChat from "@/components/WatsonChat";

export default function Home() {
  return (
    <>
      <WatsonChat />
      <Banner />
      <Maps />
      <Info />
    </>
  );
}
