import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./Display.module.scss";
import Image from "next/image";

interface DisplayProps {
  img: string;
  hvrImg: string;
  btnTitle: string;
}

const Display: React.FC<DisplayProps> = ({ img, hvrImg, btnTitle }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className={styles.display}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        width="200px"
        height="200px"
        alt="display-pants"
        src={hovering ? `${img}` : `${hvrImg}`}
      />
      <Button>{btnTitle}</Button>
    </div>
  );
};

export default Display;
