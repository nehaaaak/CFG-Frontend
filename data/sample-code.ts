export const SAMPLE_CODES = [
  /* ---------------- EASY ---------------- */
  {
    id: "if-else",
    difficulty: "easy",
    title: "If / Else",
    description: "Basic conditional branching",
    code: `def check_number(x):
    if x > 0:
        return "Positive"
    else:
        return "Non-positive"`,
  },
  {
    id: "while-loop",
    difficulty: "easy",
    title: "While Loop",
    description: "Simple loop control flow",
    code: `def count_down(n):
    while n > 0:
        print(n)
        n -= 1
    return "Done"`,
  },
  {
    id: "for-loop",
    difficulty: "easy",
    title: "For Loop",
    description: "Iterating over a range",
    code: `def sum_numbers(n):
    total = 0
    for i in range(n):
        total += i
    return total`,
  },

  /* ---------------- HARD ---------------- */
  {
    id: "analyze-number",
    difficulty: "hard",
    title: "Analyze Number",
    description: "Multiple decision paths",
    code: `def analyze_numbers(nums):
    result = []
    temp = 0
    for i in range(len(nums)):
        if nums[i] > 0:
            if nums[i] % 2 == 0:
                result.append(nums[i] * 2)
            else:
                result.append(nums[i] + 1)
        else:
            if nums[i] == 0:
                result.append(0)
            else:
                result.append(-1)
    return result`,
  },
  {
    id: "process_orders",
    difficulty: "hard",
    title: "Process Orders",
    description: "Multiple decision paths",
    code: `def process_orders(orders):
    total = 0
    result = []

    for i in range(len(orders)):
        if orders[i] is not None:
            if orders[i] > 0:
                if orders[i] % 2 == 0:
                    total += orders[i]
                    result.append(orders[i])
                else:
                    total += orders[i] + 5
                    result.append(orders[i])
            else:
                if orders[i] == 0:
                    result.append(0)
                else:
                    result.append(-1)
        else:
            result.append(-1)

    if total > 50:
        total = total - 5

    return total, result`,
  },
  {
    id: "nested-conditions",
    difficulty: "hard",
    title: "Nested Conditions",
    description: "Multiple decision paths",
    code: `def grade(score):
    if score >= 90:
        return "A"
    elif score >= 75:
        return "B"
    else:
        return "C"`,
  },
  {
    id: "loop-with-branch",
    difficulty: "hard",
    title: "Loop with Condition",
    description: "Loop containing branching logic",
    code: `def find_even(nums):
    for n in nums:
        if n % 2 == 0:
            return n
    return None`,
  },
  {
    id: "nested-loop",
    difficulty: "hard",
    title: "Nested Loop",
    description: "Multiple loops and control paths",
    code: `def matrix_sum(matrix):
    total = 0
    for row in matrix:
        for value in row:
            total += value
    return total`,
  },
  {
    id: "early-return",
    difficulty: "hard",
    title: "Early Return",
    description: "Multiple exit points",
    code: `def validate(x):
    if x is None:
        return False
    if x < 0:
        return False
    return True`,
  },
] as const;
