import * as z from "zod";

export const MAX_FILE_SIZE = 100_000_000;
const ACCEPTED_IMAGE_TYPES = ["audio/wav", "audio/mp3", "audio/m4a", "audio/flac"];

export const formSchema = z.object({
    song: z
      .any()
      .refine((files) => files?.length == 1, "Song file is required.")
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".mp3, .wav, .flac and .m4a files are accepted."
      ),
    has_instr: z.any()
});