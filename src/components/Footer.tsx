import discord from "../assets/discord.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";

export default function Footer() {
  return (
    <div className="flex justify-center flex-col h-[120px] gap-1.5">
      <div>
        <p className="text-center text-neutral-600">Developed By Kevin</p>
      </div>

      <div className="mt-[12px] flex justify-center flex-row gap-1.5">
        <div>
          <img className="h-8" src={github} alt="" />
        </div>
        <div>
          <img className="h-8" src={discord} alt="" />
        </div>
        <div>
          <img className="h-8" src={linkedin} alt="" />
        </div>
      </div>
    </div>
  );
}
