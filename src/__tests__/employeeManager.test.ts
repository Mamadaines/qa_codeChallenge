import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
  describe("EM challenge tests", () => {
  it("Add one more employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Neldon Nusbaum",
      phone: "8675309",
      title: "Big Cheese",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Neldon Nusbaum");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Neldon Nusbaum");
    expect(employee.phone).toEqual("8675309");
    expect(employee.title).toEqual("Big Cheese");
  });
it("Test cancelling an edit of an employee challenge", async () =>{
  await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.cancelChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "CEO",
    });
  });
  it("Test editing then navigating away without saving does not save changes employee challenge", async () =>{
    await em.selectEmployeeByName("Bernice Ortiz");
      await em.editEmployee({ title: "Grand Poobah" });
      await em.cancelChanges();
      await em.selectEmployeeByName("Phillip Weaver");
      await em.selectEmployeeByName("Bernice Ortiz");
      let employee = await em.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "CEO",
      });
    });
  });
});

