import { useEffect } from "react";

export default function RightLongBar() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8484893704757174"
      data-ad-slot="2648451704"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
