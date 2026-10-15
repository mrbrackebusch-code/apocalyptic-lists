# Retained source: String Arrays

Activity/source ID: MAKECODE-AP-CSP-1C-074

Original retained path: docs/pedagogy/corpus/sources/makecode-ap-csp/raw/production/1C-074/string-arrays.md

These are exact selected passages, with omissions explicitly separated. Source-local line numbers follow.

## Source lines 1-5

````text
---
title: 'String Arrays'
metaTitle: 'String Arrays'
order: 0
---
````

## Source lines 56-71

````text
* [AAP-2.N.1](https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-course-and-exam-description.pdf?course=ap-computer-science-principles#page=87) The exam reference sheet provides basic operations on lists, including:<br/>
§ accessing an element by index Text: aList[i] Block: aList i accesses the element of aList at index i. The first element of aList is at index 1 and is accessed using the notation  aList[1].<br/>
§ assigning a value of an element of a list to a variable Text: X ← aList [i] Block: X aList i assigns the value of aList[i] to the variable X.<br/>
§ assigning a value to an element of a list Text: aList[i] ← X Block: aList ix assigns the value of X to aList[i]. Text: aList[i] ← aList[j] Block: aListaList ij assigns the value of aList[j] to aList[i]. <br/>
§ inserting elements at a given index Text: INSERT(aList, i, value) Block: aList, i, valueINSERT shifts to the right any values in aList at indices greater than or equal to i. The length of the list is increased by 1, and value is placed at index i in aList.<br/>
§ adding elements to the end of the list Text: APPEND(aList, value) Block: APPEND aList, value increases the length of aList by 1, and value is placed at the end of aList.<br/>
§ removing elements Text: REMOVE(aList, i) Block: REMOVE aList, i removes the item at index i in aList and shifts to the left any values at indices greater than i. The length of aList is decreased by 1.<br/>
§ determining the length of a list Text: LENGTH(aList) Block: LENGTH aList evaluates to the number of elements currently in aList.
* [AAP-2.N.2](https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-course-and-exam-description.pdf?course=ap-computer-science-principles#page=87) List procedures are implemented in accordance with the syntax rules of the programming language. 
* AAP-2.O.1 Traversing a list can be a complete traversal, where all elements in the list are accessed, or a partial traversal, where only a portion of elements are accessed.<br/>
XEXCLUSIONSTATEMENT(EKAAP-2.O.1): Traversing multiple lists at the same time using the same index for both (parallel traversals) is outside the scope of this course and the AP Exam. 
* [AAP-2.O.2](https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-course-and-exam-description.pdf?course=ap-computer-science-principles#page=88) Iteration statements can be used to traverse a list.
* [AAP-2.O.3](https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-course-and-exam-description.pdf?course=ap-computer-science-principles#page=88) The exam reference sheet provides
    * Text: FOR EACH item IN aList { &lt;block of statements&gt; }
    * Block: FOR EACH item IN aList block of statements
    * The variable item is assigned the value of each element of aList sequentially, in order, from the first element to the last element. The code in block of statements is executed once for each assignment of item.  
````

## Source lines 79-105

````text
### 1. Review Arrays (5 minutes)

* Define lists in computer science.
* Explain how lists are used.

### 2. Introduction to String Lists (15 minutes)

* Define Lists.
* Explain how string lists are used.
* Demonstrate how to create a string list in MakeCode.
* Practice reducing redundancy with an array of string.

### 3. Activity:  Arrays of Strings (30 minutes)

* Direct students to the <a href="/unit-5/day-15/arrays-of-strings">Arrays of Strings</a> page.
* Students will go to the [Activity: Arrays of Strings](https://arcade.makecode.com/courses/csintro2/arrays/string) webpage.
* Instruct students to complete Tasks 1a and 1b.
* Encourage students to publish their work and paste the links on their <a href="/unit-5/day-15/arrays-of-strings">Arrays of Strings</a> page.
* If students finish early, encourage students to do the optional extension activities.

### 4. Reflection/Homework

_If you run out of time, you may also assign this as individual homework. Students should complete their reflection._

1. Why do we use the length of array instead of just “hard-coding” the value of the length (for example 4)?
2. What is the difference between a For Index and a For Value loop?
3. Can you think of any situations where you might prefer the For Index loop when using arrays?
````
