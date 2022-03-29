import sixty_percent_PBT from "../assets/images/keyboards/sixty-percent/PBT.png";
import sixty_percent_ABS from "../assets/images/keyboards/sixty-percent/ABS.png";
import seventy_five_percent_PBT from "../assets/images/keyboards/seventy-five-percent/PBT.png";
import seventy_five_percent_ABS from "../assets/images/keyboards/seventy-five-percent/ABS.png";
import eighty_percent_PBT from "../assets/images/keyboards/eighty-percent/PBT.png";
import eight_percent_ABS from "../assets/images/keyboards/eighty-percent/ABS.png";
import iso_105_PBT from "../assets/images/keyboards/iso-105/PBT.png";
import iso_105_ABS from "../assets/images/keyboards/iso-105/ABS.png";

const keyboards = [
  { name: "sixty_percent_PBT", url: sixty_percent_PBT },
  { name: "sixty_percent_ABS", url: sixty_percent_ABS },
  { name: "seventy_five_percent_PBT", url: seventy_five_percent_PBT },
  { name: "seventy_five_percent_ABS", url: seventy_five_percent_ABS },
  { name: "eighty_percent_PBT", url: eighty_percent_PBT },
  { name: "eight_percent_ABS", url: eight_percent_ABS },
  { name: "iso_105_PBT", url: iso_105_PBT },
  { name: "iso_105_ABS", url: iso_105_ABS },
];

export default function Keyboard({ kind, isPBT, filter }) {
  console.log(kind, isPBT, filter);
  const kindDir = {
    0: "sixty_percent",
    1: "seventy_five_percent",
    2: "eighty_percent",
    3: "iso_105",
  }[kind];

  const fileName = isPBT ? "PBT" : "ABS";

  const alt = `${kindDir} keyboard with ${isPBT ? "PBT" : "ABS"} keys ${
    filter ? `with ${filter}` : ""
  }`;

  const path = `${kindDir}_${fileName}`;
  const currentKeyboard = keyboards.find((item) => item.name === path);
  return (
    <div className="rounded-lg p-2 border border-white">
      <img
        className={"h-[230px] w-[360px] " + filter}
        src={currentKeyboard.url}
        alt={alt}
      />
    </div>
  );
}
