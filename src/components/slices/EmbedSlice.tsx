interface Props {
  primary?: {
    target?: {
      html?: string;
      provider_name?: string;
    };
  };
  slice_type?: string;
}

export function EmbedSlice({ primary, slice_type }: Props) {
  const embed = primary?.target;

  if (!embed?.html) {
    return null;
  }

  // Make YouTube embeds responsive by replacing fixed dimensions
  let html = embed.html;
  if (embed.provider_name === 'YouTube') {
    html = html.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
  }

  return (
    <figure data-slice-type={slice_type} data-provider={embed.provider_name}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
