import { useBundle } from '../state/BundleContext';
import { countSelectedProducts } from '../lib/pricing';
import type { Product, StepDef } from '../types';
import { Step } from './Step';
import { ProductCard } from './ProductCard';
import { PlanCard } from './PlanCard';
import { NextButton } from './NextButton';

/** The left column */
export function Builder() {
  const { catalog, state, dispatch } = useBundle();

  return (

    <div className="min-w-0 self-start">
      {catalog.steps.map((step, index) => {
        const open = state.openStep === step.id;
        const selectedCount =
          step.kind === 'plan'
            ? state.selectedPlanId
              ? 1
              : 0
            : countSelectedProducts(catalog, state, step.category!);

        return (
          <Step
            key={step.id}
            step={step}
            index={index}
            total={catalog.steps.length}
            open={open}
            selectedCount={selectedCount}
            onToggle={() => dispatch({ type: 'OPEN_STEP', stepId: step.id })}
          >
            {step.kind === 'plan' ? <PlanStep step={step} /> : <ProductStep step={step} />}
          </Step>
        );
      })}
    </div>
  );
}

function ProductStep({ step }: { step: StepDef }) {
  const { catalog, dispatch } = useBundle();
  const products = catalog.products.filter((p) => p.category === step.category);

  const tablet =
    products.length >= 5
      ? 'md:grid-cols-3 lg:grid-cols-5'
      : products.length === 4
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : products.length === 3
          ? 'md:grid-cols-3'
          : 'md:grid-cols-2';
  const cols = `${tablet} xl:grid-cols-2`;

  return (
    <>
      <div className={`grid grid-cols-1 gap-4 ${cols}`}>
        {products.map((product: Product, i) => {
          const lonelyLast = i === products.length - 1 && products.length % 2 === 1;
          return (
            <div
              key={product.id}
              className={`min-w-0 ${
                lonelyLast ? 'xl:col-span-2 xl:mx-auto xl:w-[calc(50%-0.5rem)]' : ''
              }`}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
      {step.nextLabel && (
        <NextButton
          label={step.nextLabel}
          onClick={() => dispatch({ type: 'ADVANCE', catalog, fromStepId: step.id })}
        />
      )}
    </>
  );
}

function PlanStep({ step }: { step: StepDef }) {
  const { catalog, state, dispatch } = useBundle();

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        {catalog.plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={state.selectedPlanId === plan.id}
            onSelect={() => dispatch({ type: 'SELECT_PLAN', planId: plan.id })}
          />
        ))}
      </div>
      {step.nextLabel && (
        <NextButton
          label={step.nextLabel}
          onClick={() => dispatch({ type: 'ADVANCE', catalog, fromStepId: step.id })}
        />
      )}
    </>
  );
}
