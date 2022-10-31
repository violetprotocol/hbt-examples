import { CheckIcon } from "@heroicons/react/20/solid";
import { classNames } from "src/utils";

export type Step = {
  name: string;
  description: string;
  href: string;
  status: StepStatus;
};

export enum StepStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

export default function Steps({ steps }: { steps: Step[] }) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {step.status === StepStatus.COMPLETE ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-green-600"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 group-hover:bg-green-800">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col items-baseline">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-white-500">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            ) : step.status === StepStatus.IN_PROGRESS ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  href={step.href}
                  className="group relative flex items-start"
                  aria-current="step"
                >
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-600 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col items-baseline">
                    <span className="text-sm font-medium text-green-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-white-500">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    aria-hidden="true"
                  />
                ) : null}
                <a href={step.href} className="group relative flex items-start">
                  <span className="flex h-9 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col items-baseline">
                    <span className="text-sm font-medium text-white-500">
                      {step.name}
                    </span>
                    <span className="text-sm text-white-500">
                      {step.description}
                    </span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
