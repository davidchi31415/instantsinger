"use client";

const audios = {
    "sample1": new Audio("https://storage.googleapis.com/instantsinger-public/original/sample1_original.mp3"),
    "sample2": new Audio("https://storage.googleapis.com/instantsinger-public/original/sample2_original.mp3"),
    "sample3": new Audio("https://storage.googleapis.com/instantsinger-public/original/sample3_original.mp3"),
    "sample4": new Audio("https://storage.googleapis.com/instantsinger-public/original/sample4_original.mp3"),
    'boy1': new Audio("https://storage.googleapis.com/instantsinger-public/original/boy1.mp3"),
    'boy2': new Audio("https://storage.googleapis.com/instantsinger-public/original/boy2.mp3"),
    'girl1': new Audio("https://storage.googleapis.com/instantsinger-public/original/girl1.mp3"),
    'girl2': new Audio("https://storage.googleapis.com/instantsinger-public/original/girl2.mp3"),
    "boy1_sample1": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy1_sample1.mp3"),
    "boy1_sample2": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy1_sample2.mp3"),
    "boy1_sample3": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy1_sample3.mp3"),
    "boy1_sample4": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy1_sample4.mp3"),
    "boy2_sample1": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy2_sample1.mp3"),
    "boy2_sample2": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy2_sample2.mp3"),
    "boy2_sample3": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy2_sample3.mp3"),
    "boy2_sample4": new Audio("https://storage.googleapis.com/instantsinger-public/original/boy2_sample4.mp3"),
    "girl1_sample1": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl1_sample1.mp3"),
    "girl1_sample2": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl1_sample2.mp3"),
    "girl1_sample3": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl1_sample3.mp3"),
    "girl1_sample4": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl1_sample4.mp3"),
    "girl2_sample1": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl2_sample1.mp3"),
    "girl2_sample2": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl2_sample2.mp3"),
    "girl2_sample3": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl2_sample3.mp3"),
    "girl2_sample4": new Audio("https://storage.googleapis.com/instantsinger-public/original/girl2_sample4.mp3"),
};

let currentlyPlaying = "";

const play = (name, onFinished) => {
    if (currentlyPlaying) {
        audios[currentlyPlaying].pause();
        audios[name].removeEventListener('ended', onFinished);
    }
    audios[name].play();
    audios[name].addEventListener('ended', onFinished);
    currentlyPlaying = name;
};

const pause = (name?) => {
    currentlyPlaying = "";
    if (name) {
        audios[name].pause();
    } else {
        for (let audioName in audios) {
            if (audios.hasOwnProperty(audioName)) {
              audios[audioName].pause();
            }
        }
    }
};

export default {
    pause,
    play
};