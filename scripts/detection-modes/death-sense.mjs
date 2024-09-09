import DetectionModeDetect from "./detect.mjs";

/**
 * The detection mode for Death Sense.
 */
export default class DetectionModeDeathSense extends DetectionModeDetect {

    constructor() {
        super({
            id: "deathSense",
            label: "VISION5E.DeathSense"
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
        const source = visionSource.object;

        
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
