import Iphone15Pro from "@/components/magicui/iphone-15-pro";

export function Iphone15ProDemo() {
  return (
    <div className="relative">
      <Iphone15Pro
      horizAdvX={200}
      horizOriginX={400}
    //   hanging={false}
    //   height={250}
    //   width={200}
        className="size-full md:max-w-2xl mx-auto h-auto"
        videoSrc="https://videos.pexels.com/video-files/8946986/8946986-uhd_1440_2732_25fps.mp4"
      />
    </div>
  );
}
