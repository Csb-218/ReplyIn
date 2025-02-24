export function convert_to_readable(text:string){
    return text.replace(/\n/g, '<br>')
}

export function convert_to_readable_input(text:string){
    return text
    .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with newlines
    .replace(/<[^>]*>?/g, ''); // Remove any other HTML tags
}

export function toInputBox(text:string){
    return text
    .replace(/<([a-zA-Z]+)([^>]*)\/?>/g, '\n')
    .replace(/<\/([a-zA-Z]+)>/g, ' ');
}