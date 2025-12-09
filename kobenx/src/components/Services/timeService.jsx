import Parse from "parse";


const timeSincePost = ({post}) => {
    const timeDiff = (Date.now() - post.createdAt) / 1000;
    let value, unit;

    if (timeDiff < 60) {
    value = 'Just now'
    unit = ''
    } else if (timeDiff < 3600) {
    value = Math.round((Date.now() - post.createdAt) / (1000 * 60));
    unit = "m";
    } else if (timeDiff < 86400) {
    value = Math.round((Date.now() - post.createdAt) / (1000 * 60 * 60));
    unit = "h";
    } else {
    value = post.get('createdAt').toLocaleString("en-Gb", { day: "numeric", month: "short" })
    unit = ''
    }
    return `${value}${unit}`;
};

//time since moved function
const timeSinceMoved = ({user}) => {
    const movedDate = new Date(user.get("dateMovedToCph"));
    const now = new Date();

    // Calculate differences
    const diffTime = now - movedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let value, unit;

    if (diffDays < 30) {
    value = diffDays;
    unit = "day";
    } else if (diffDays < 365) {
    value = Math.floor(diffDays / 30);
    unit = "month";
    } else {
    value = Math.floor(diffDays / 365);
    unit = "year";
    }

    const multiple = value !== 1 ? "s" : "";
    return `${value} ${unit}${multiple} in CPH`;
};

export {timeSinceMoved, timeSincePost}