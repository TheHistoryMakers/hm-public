export class TimedTextMatch {
    public time: number; // milliseconds offset into a transcript's video 
    public startOffset: number; // start character offset within the matched text field (assumed to be transcript field)
    public endOffset: number; // character offset at the end (i.e., 1 after) the matched text
}