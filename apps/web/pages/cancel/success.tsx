import { CheckIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import Button from "@calcom/ui/Button";

import { HeadSeo } from "@components/seo/head-seo";

export default function CancelSuccess() {
  const { t } = useLocale();
  // Get router variables
  const router = useRouter();
  const { title, name, eventPage } = router.query;
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <div>
      <HeadSeo
        title={`${t("cancelled")} ${title} | ${name}`}
        description={`${t("cancelled")} ${title} | ${name}`}
      />
      <main className="mx-auto my-24 max-w-3xl">
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 my-4 transition-opacity sm:my-0" aria-hidden="true">
              <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                      {t("cancellation_successful")}
                    </h3>
                    {!loading && !session?.user && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{t("free_to_pick_another_event_type")}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-center sm:mt-6">
                  <div className="mt-5">
                    {!loading && !session?.user && <Button href={eventPage as string}>Pick another</Button>}
                    {!loading && session?.user && (
                      <Button data-testid="back-to-bookings" href="/bookings" StartIcon={ArrowLeftIcon}>
                        {t("back_to_bookings")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
