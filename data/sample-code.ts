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

  /* ---------------- MEDIUM ---------------- */
  {
    id: "fibonacci",
    difficulty: "medium",
    suggestion: true,
    title: "Fibonacci",
    description: "Recursive function with base cases",
    code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
  },
  {
    id: "binary-search",
    difficulty: "medium",
    suggestion: true,
    title: "Binary Search",
    description: "Loop with conditional branching",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  },
  {
    id: "bubble-sort",
    difficulty: "medium",
    suggestion: true,
    title: "Bubble Sort",
    description: "Nested loops with swapping logic",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
  },

  /* ---------------- HARD ---------------- */
  {
    id: "analyze-number",
    difficulty: "hard",
    suggestion: true,
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
