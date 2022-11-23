import React, { useState } from "react";
import Button from "../Button";
import styles from "./Display.module.scss";
import Image from "next/image";
import Link from "next/link";

interface DisplayProps {
  img: string;
  hvrImg: string;
  btnTitle: string;
  link: string;
}

const Display: React.FC<DisplayProps> = ({ img, hvrImg, btnTitle, link }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <Link href={link}>
      <div
        className={styles.display}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Image
          width="200px"
          height="200px"
          alt="display-pants"
          src={hovering ? `${hvrImg}` : `${img}`}
        />
        <Button>{btnTitle}</Button>
      </div>
    </Link>
  );
};

export default Display;
