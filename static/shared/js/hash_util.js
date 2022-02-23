const hashReplacements = new Map([
    ["%", "."],
    ["(", ".28"],
    [")", ".29"],
    [".", ".2E"],
]);

export function id_to_slug(stream_id, maybe_get_stream_name) {
    let name = maybe_get_stream_name(stream_id) || "unknown";

    // The name part of the URL doesn't really matter, so we try to
    // make it pretty.
    name = name.replace(" ", "-");

    return stream_id + "-" + name;
}

// Some browsers zealously URI-decode the contents of
// window.location.hash.  So we hide our URI-encoding
// by replacing % with . (like MediaWiki).
export function encodeHashComponent(str) {
    return encodeURIComponent(str).replace(/[%().]/g, (matched) => hashReplacements.get(matched));
}

export function encode_stream_id(stream_id, maybe_get_stream_name) {
    // stream_data appends the stream name, but it does not do the
    // URI encoding piece
    const slug = id_to_slug(stream_id, maybe_get_stream_name);

    return encodeHashComponent(slug);
}

export function by_stream_uri(stream_id, maybe_get_stream_name) {
    return "#narrow/stream/" + encode_stream_id(stream_id, maybe_get_stream_name);
}

export function by_stream_topic_uri(stream_id, topic, maybe_get_stream_name) {
    return (
        "#narrow/stream/" +
        encode_stream_id(stream_id, maybe_get_stream_name) +
        "/topic/" +
        encodeHashComponent(topic)
    );
}
