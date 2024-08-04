const sounds = new URL("/sounds", import.meta.url).href + "/";

export const SKIN={
  classic: {
    name: "Классика",
    class:"circle"
  },
  quad: {
    name: "Плитка",
    class:""
  },

}

export const COMPLEXITY = {
  easy: {
    segments: 4,
    speed: 1,
    name: "Новичёк",
  },

  middle: {
    segments: 4,
    speed: 2,
    name: "Бывалый",
  },

  hard: {
    segments: 9,
    speed: 1,
    name: "Князъ",
  },

  cyborg: {
    segments: 9,
    speed: 2,
    name: "Киборг помноженный на вечность",
  },
};

export const COLORS = [
  "red",
  "green",
  "yellow",
  "blue",
  "pink",
  "orange",
  "purple",
  "cream",
  "neon",
];

export const SOUNDS = {
  Standart: [
    `${sounds}standart/part_1.mp3`,
    `${sounds}standart/part_2.mp3`,
    `${sounds}standart/part_3.mp3`,
    `${sounds}standart/part_4.mp3`,
    `${sounds}standart/part_5.mp3`,
    `${sounds}standart/part_6.mp3`,
    `${sounds}standart/part_7.mp3`,
    `${sounds}standart/part_8.mp3`,
    `${sounds}standart/part_9.mp3`,
  ],
  Simon: [
    `${sounds}simon/part_1.mp3`,
    `${sounds}simon/part_2.mp3`,
    `${sounds}simon/part_3.mp3`,
    `${sounds}simon/part_4.mp3`,
    `${sounds}simon/part_5.mp3`,
    `${sounds}simon/part_6.mp3`,
    `${sounds}simon/part_7.mp3`,
    `${sounds}simon/part_8.mp3`,
    `${sounds}simon/part_9.mp3`,
  ],
  Tractor: [
    `${sounds}tractor/part_1.mp3`,
    `${sounds}tractor/part_2.mp3`,
    `${sounds}tractor/part_3.mp3`,
    `${sounds}tractor/part_4.mp3`,
    `${sounds}tractor/part_5.mp3`,
    `${sounds}tractor/part_6.mp3`,
    `${sounds}tractor/part_7.mp3`,
    `${sounds}tractor/part_8.mp3`,
    `${sounds}tractor/part_9.mp3`,
  ],
};
