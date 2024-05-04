import image01 from "./tiles/FieldsTile_01.png";
import image02 from "./tiles/FieldsTile_02.png";
import image03 from "./tiles/FieldsTile_03.png";
import image04 from "./tiles/FieldsTile_04.png";
import image05 from "./tiles/FieldsTile_05.png";
import image06 from "./tiles/FieldsTile_06.png";
import image07 from "./tiles/FieldsTile_07.png";
import image08 from "./tiles/FieldsTile_08.png";
import image09 from "./tiles/FieldsTile_09.png";
import image10 from "./tiles/FieldsTile_10.png";
import image11 from "./tiles/FieldsTile_11.png";
import image12 from "./tiles/FieldsTile_12.png";
import image13 from "./tiles/FieldsTile_13.png";
import image14 from "./tiles/FieldsTile_14.png";
import image15 from "./tiles/FieldsTile_15.png";
import image16 from "./tiles/FieldsTile_16.png";
import image17 from "./tiles/FieldsTile_17.png";
import image18 from "./tiles/FieldsTile_18.png";
import image19 from "./tiles/FieldsTile_19.png";
import image20 from "./tiles/FieldsTile_20.png";
import image21 from "./tiles/FieldsTile_21.png";
import image22 from "./tiles/FieldsTile_22.png";
import image23 from "./tiles/FieldsTile_23.png";
import image24 from "./tiles/FieldsTile_24.png";
import image25 from "./tiles/FieldsTile_25.png";
import robot from "./items/robot.png";
import chest from "./items/chest.png";

const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
    image08,
    image09,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
];

export default function Mine({ row, col, goal_row, goal_col }) {
    const robotIndex = row * 5 + col;
    const goalIndex = goal_row * 5 + goal_col;

    return (
        <div className="flex justify-center items-center h-screen">
            <ul role="list" className="grid grid-cols-5 justify-center gap-2">
                {images.map((image, index) => (
                    <li key={index} className="relative w-36 h-36">
                        <img
                            src={image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {index == goalIndex && (
                            <img
                                src={chest}
                                alt="robot"
                                className="absolute inset-0 w-full h-full"
                            />
                        )}
                        {index == robotIndex && (
                            <img
                                src={robot}
                                alt="robot"
                                className="absolute inset-0 w-full h-full"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
