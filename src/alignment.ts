import { Diagram, DiagramType, diagram_combine, Anchor } from './diagram.js';
import { Vector2, V2 } from './vector.js';

type VerticalAlignment   = 'top'  | 'center' | 'bottom';
type HorizontalAlignment = 'left' | 'center' | 'right';

/**
 * Align diagrams vertically
 * @param diagrams diagrams to be aligned
 * @param alignment vertical alignment of the diagrams
 * alignment can be 'top', 'center', or 'bottom'
 * @returns array of aligned diagrams
 */
export function align_vertical(diagrams : Diagram[], alignment : VerticalAlignment = 'center') : Diagram[] {
    // align all the diagrams following the first diagram
    if (diagrams.length == 0) { return diagrams; }

    if (alignment == 'top'){
        let top_y = diagrams[0].get_anchor("top-left").y;
        return diagrams.map(d => d.translate(V2(0, top_y - d.get_anchor("top-left").y)));
    }
    else if (alignment == 'center'){
        let center_y = diagrams[0].get_anchor("center-left").y;
        return diagrams.map(d => d.translate(V2(0, center_y - d.get_anchor("center-left").y)));
    }
    else if (alignment == 'bottom'){
        let bottom_y = diagrams[0].get_anchor("bottom-left").y;
        return diagrams.map(d => d.translate(V2(0, bottom_y - d.get_anchor("bottom-left").y)));
    }
    else {
        throw new Error("Unknown vertical alignment : " + alignment);
    }
}

/**
 * Align diagrams horizontally
 * @param diagrams diagrams to be aligned
 * @param alignment horizontal alignment of the diagrams
 * alignment can be 'left', 'center', or 'right'
 * @returns array of aligned diagrams
 */
export function align_horizontal(diagrams : Diagram[], alignment : HorizontalAlignment = 'center') : Diagram[] {

    // align all the diagrams following the first diagram
    if (diagrams.length == 0) { return diagrams; }

    if (alignment == 'left'){
        let left_x = diagrams[0].get_anchor("top-left").x;
        return diagrams.map(d => d.translate(V2(left_x - d.get_anchor("top-left").x, 0)));
    }
    else if (alignment == 'center'){
        let center_x = diagrams[0].get_anchor("top-center").x;
        return diagrams.map(d => d.translate(V2(center_x - d.get_anchor("top-center").x, 0)));
    }
    else if (alignment == 'right'){
        let right_x = diagrams[0].get_anchor("top-right").x;
        return diagrams.map(d => d.translate(V2(right_x - d.get_anchor("top-right").x, 0)));
    }
    else {
        throw new Error("Unknown horizontal alignment : " + alignment);
    }
}

/**
 * Distribute diagrams horizontally
 * @param diagrams diagrams to be distributed
 * @param space space between the diagrams (default = 0)
 * @returns array of distributed diagrams
 */
export function distribute_horizontal(diagrams : Diagram[], space : number = 0) : Diagram[] {
    if (diagrams.length == 0) { return diagrams; }

    let distributed_diagrams : Diagram[] = [diagrams[0]];
    for (let i = 1; i < diagrams.length; i++) {
        let prev_diagram = distributed_diagrams[i-1];
        let this_diagram = diagrams[i];
        let prev_right = prev_diagram.get_anchor("top-right").x;
        let this_left  = this_diagram.get_anchor("top-left").x;
        let dx = prev_right - this_left + space;
        distributed_diagrams.push(this_diagram.translate(V2(dx, 0)));
    }
    return distributed_diagrams;
}

/**
 * Distribute diagrams vertically
 * @param diagrams diagrams to be distributed
 * @param space space between the diagrams (default = 0)
 * @returns array of distributed diagrams
 */
export function distribute_vertical(diagrams : Diagram[], space : number = 0) : Diagram[] {
    if (diagrams.length == 0) { return diagrams; }

    let distributed_diagrams : Diagram[] = [diagrams[0]];
    for (let i = 1; i < diagrams.length; i++) {
        let prev_diagram = distributed_diagrams[i-1];
        let this_diagram = diagrams[i];
        let prev_bottom = prev_diagram.get_anchor("bottom-left").y;
        let this_top    = this_diagram.get_anchor("top-left").y;
        let dy = prev_bottom - this_top - space;
        distributed_diagrams.push(this_diagram.translate(V2(0, dy)));
    }
    return distributed_diagrams;
}

/**
 * Distribute diagrams horizontally and align
 * @param diagrams diagrams to be distributed
 * @param horizontal_space space between the diagrams (default = 0)
 * @param alignment vertical alignment of the diagrams
 * alignment can be 'top', 'center', or 'bottom'
 * @returns array of distributed and aligned diagrams
 */
export function distribute_horizontal_and_align(diagrams : Diagram[], horizontal_space : number = 0,
    alignment : VerticalAlignment = 'center') : Diagram[] {
    return distribute_horizontal(align_vertical(diagrams, alignment), horizontal_space);
}

/**
 * Distribute diagrams vertically and align
 * @param diagrams diagrams to be distributed
 * @param vertical_space space between the diagrams (default = 0)
 * @param alignment horizontal alignment of the diagrams
 * alignment can be 'left', 'center', or 'right'
 * @returns array of distributed and aligned diagrams
 */
export function distribute_vertical_and_align(diagrams : Diagram[], vertical_space : number = 0,
    alignment : HorizontalAlignment = 'center') : Diagram[] {
    return distribute_vertical(align_horizontal(diagrams, alignment), vertical_space);
}

// ============ function that also combine the diagram afterwards
export function align_vertical_c(diagrams : Diagram[], alignment : VerticalAlignment = 'center') : Diagram {
    return diagram_combine(...align_vertical(diagrams, alignment));
}
export function align_horizontal_c(diagrams : Diagram[], alignment : HorizontalAlignment = 'center') : Diagram {
    return diagram_combine(...align_horizontal(diagrams, alignment));
}
export function distribute_horizontal_c(diagrams : Diagram[], space : number = 0) : Diagram {
    return diagram_combine(...distribute_horizontal(diagrams, space));
}
export function distribute_vertical_c(diagrams : Diagram[], space : number = 0) : Diagram {
    return diagram_combine(...distribute_vertical(diagrams, space));
}
export function distribute_horizontal_and_align_c(diagrams : Diagram[], horizontal_space : number = 0,
    alignment : VerticalAlignment = 'center') : Diagram {
    return diagram_combine(...distribute_horizontal_and_align(diagrams, horizontal_space, alignment));
}
export function distribute_vertical_and_align_c(diagrams : Diagram[], vertical_space : number = 0,
    alignment : HorizontalAlignment = 'center') : Diagram {
    return diagram_combine(...distribute_vertical_and_align(diagrams, vertical_space, alignment));
}
