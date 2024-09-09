import DetectionModeDetect from "./detect.mjs";

/**
 * The detection mode for Detect Evil and Good.
 */
export default class DetectionModeDetectEvilAndGood extends DetectionModeDetect {

    constructor() {
        super({
            id: "detectEvilAndGood",
            label: "VISION5E.DetectEvilAndGood"
        });
    }

    /** @override */
    static getDetectionFilter() {
        return this._detectionFilter ??= GlowOverlayFilter.create({
            glowColor: [1, 1, 0, 1]
        });
    }

    /** @override */
    _canDetect(visionSource, target) {
        if (!super._canDetect(visionSource, target)) {
            return false;
        }

        if (!target.actor.system.details?.type
            || target.document.hasStatusEffect(CONFIG.specialStatusEffects.OBJECT)
            || target.document.hasStatusEffect(CONFIG.specialStatusEffects.PETRIFIED)) {
            return false;
        }

        if (target.document.hasStatusEffect(CONFIG.specialStatusEffects.REVENANCE)) {
            return true;
        }

        if (target.document.hasStatusEffect(CONFIG.specialStatusEffects.DEAD)) {
            return true;
        }

        if (target.document.hasStatusEffect(CONFIG.specialStatusEffects.UNCONSCIOUS)
            && !(target.document.hasStatusEffect(CONFIG.specialStatusEffects.STABLE) || target.document.hasStatusEffect(CONFIG.specialStatusEffects.SLEEPING)) ){
            return true;
        }

        const type = target.actor.system.details.type.value;

        return type === "undead";
    }
}
