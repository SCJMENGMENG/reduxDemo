import *as types from '../constans/slideTypes';

export function leftSlide() {
    return {
        type:types.LEFTSLIDE,
    }
}

export function rightSlide() {
    return {
        type:types.RIGHTSLIDE,
    }
}