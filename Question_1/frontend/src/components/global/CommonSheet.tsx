import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const CommonSheet = ({
  children,
  open,
  close,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  close: (isOpen: boolean) => void;
  title?: string;
}) => {
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="min-w-[50vw]">
        <SheetHeader>
          <SheetTitle>{title || "Details"}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default CommonSheet;
