import airBackground from '../../images/bg-air.png';
import earthBackground from '../../images/bg-earth.png';
import fireBackground from '../../images/bg-fire.png';
import iceBackground from '../../images/bg-ice.png';
import lightningBackground from '../../images/bg-lightning.png';
import metalBackground from '../../images/bg-metal.png';
import natureBackground from '../../images/bg-nature.png';
import waterBackground from '../../images/bg-water.png';
import { ELEMENTS } from './elements';

export function getElementBackground(element?: string) {
    switch (element) {
        case ELEMENTS.FIRE:
            return fireBackground;
        case ELEMENTS.EARTH:
            return earthBackground;
        case ELEMENTS.LIGHTNING:
            return lightningBackground;
        case ELEMENTS.NATURE:
            return natureBackground;
        case ELEMENTS.AIR:
            return airBackground;
        case ELEMENTS.WATER:
            return waterBackground;
        case ELEMENTS.ICE:
            return iceBackground;
        case ELEMENTS.METAL:
            return metalBackground;
        default:
            return lightningBackground;
    }
}
