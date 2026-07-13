"use client";

import Link from "next/link";
import type React from "react";
import { pushEvent } from "@/utils/enhancedConversions";

type TrackedOutboundLinkProps = React.ComponentProps<typeof Link> & {
  eventName: string;
  eventParams?: Record<string, string>;
};

export default function TrackedOutboundLink({
  eventName,
  eventParams = {},
  onClick,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        pushEvent(eventName, {
          ...eventParams,
          page_path: window.location.pathname,
        });
        onClick?.(event);
      }}
    />
  );
}
